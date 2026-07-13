import express from 'express';
import Contact from '../models/Contact.js';
import Log from '../models/Log.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Mock fallback databases (in-memory) if MongoDB is not connected
let mockContacts = [];
let mockLogs = [
  { timestamp: new Date(Date.now() - 3600000 * 5), sourceIp: '185.220.101.4', event: 'SSH Brute Force Attempt', severity: 'HIGH', status: 'BLOCKED', targetPort: 22 },
  { timestamp: new Date(Date.now() - 3600000 * 4), sourceIp: '45.142.120.9', event: 'SQL Injection Detected', severity: 'CRITICAL', status: 'BLOCKED', targetPort: 443 },
  { timestamp: new Date(Date.now() - 3600000 * 3), sourceIp: '192.168.1.15', event: 'Port Scan Activity', severity: 'MEDIUM', status: 'CONTAINED', targetPort: 80 },
  { timestamp: new Date(Date.now() - 3600000 * 2), sourceIp: '82.102.23.41', event: 'OWASP Top 10 RCE Scan', severity: 'CRITICAL', status: 'BLOCKED', targetPort: 8080 },
  { timestamp: new Date(Date.now() - 3600000 * 1), sourceIp: '198.51.100.72', event: 'Unauthorized Login Attempt', severity: 'HIGH', status: 'RESOLVED', targetPort: 22 }
];

let sseClients = [];

const broadcastLog = (log) => {
  sseClients.forEach(client => {
    try {
      client.res.write(`data: ${JSON.stringify(log)}\n\n`);
    } catch {
      // Clean up failed connections
    }
  });
};

// Helper to check if Mongoose is connected
const isMongoConnected = () => {
  return typeof window === 'undefined' && Contact.db && Contact.db.readyState === 1;
};

// Projects list (MERN project details)
const projects = [
  {
    id: 1,
    title: "Cinemas Movie Dashboard",
    description: "A high-performance full-stack MERN application for movie data ingestion, search, and pagination. Features advanced search filters, user-specific watchlist storage, and dynamic admin panel.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Material UI", "REST APIs"],
    highlights: [
      "Designed dynamic pagination filters for handling large datasets.",
      "Implemented secure MongoDB aggregation queries for list operations.",
      "Optimized React rendering cycles using callback hooks."
    ],
    github: "https://github.com/raees027/Movie-App",
    live: "https://cinemas.raees.dev"
  },
  {
    id: 2,
    title: "ScamShield",
    description: "Fullstack security scanner and reporter platform blocking fraudulent UPIs, phone numbers, and URLs.",
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Express.js", "Neon PostgreSQL"],
    highlights: [
      "Scan API routes evaluating threat registries dynamically.",
      "Automated verification logs mapping user reports.",
      "Secured REST endpoints against automated queries."
    ],
    github: "https://github.com/raees027/Scam-shield",
    live: "https://scamshield.raees.dev"
  }
];

// GET Projects
router.get('/projects', (req, res) => {
  res.json(projects);
});

// GET SOC Logs
router.get('/logs', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const logs = await Log.find().sort({ timestamp: -1 }).limit(20);
      return res.json(logs);
    }
    res.json(mockLogs);
  } catch (error) {
    console.error('Error fetching logs, returning mock data:', error);
    res.json(mockLogs);
  }
});

// GET Real-Time Logs Stream (Server-Sent Events)
router.get('/logs/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  sseClients.push(newClient);

  // Send initial dataset
  res.write(`data: ${JSON.stringify(mockLogs)}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c.id !== clientId);
  });
});

// POST SOC Log
router.post('/logs', async (req, res) => {
  const { sourceIp, event, severity, status, targetPort } = req.body;
  const newLog = {
    timestamp: new Date().toISOString(),
    sourceIp: sourceIp || '127.0.0.1',
    event: event || 'Simulated Port Scan',
    severity: severity || 'LOW',
    status: status || 'LOGGED',
    targetPort: targetPort || 80
  };

  try {
    if (isMongoConnected()) {
      const savedLog = await Log.create(newLog);
      broadcastLog(savedLog);
      return res.status(201).json(savedLog);
    }
    // Fallback
    mockLogs.unshift(newLog);
    if (mockLogs.length > 30) mockLogs.pop();
    broadcastLog(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error saving log, using fallback:', error);
    mockLogs.unshift(newLog);
    broadcastLog(newLog);
    res.status(201).json(newLog);
  }
});

const sendEmailNotification = async (contact) => {
  const { name, email, subject, message } = contact;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.log('[Nodemailer] Email notifications bypassed: EMAIL_USER or EMAIL_PASS not configured.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"${name}" <${user}>`,
      replyTo: email,
      to: user,
      subject: `[Portfolio Contact] ${subject || 'New Message'}`,
      text: `You received a new message from your portfolio contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject || 'None'}\n\n` +
            `Message:\n${message}\n`
    };

    await transporter.sendMail(mailOptions);
    console.log('[Nodemailer] Email sent successfully to', user);
  } catch (error) {
    console.error('[Nodemailer] Failed to send email:', error);
  }
};

// POST Contact Form
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message.' });
  }

  const contactData = { name, email, subject, message, createdAt: new Date() };

  // Send asynchronous notification
  sendEmailNotification(contactData);

  try {
    if (isMongoConnected()) {
      const savedContact = await Contact.create(contactData);
      return res.status(201).json({ success: true, message: 'Message sent successfully!', data: savedContact });
    }
    // Fallback
    mockContacts.push(contactData);
    console.log('Saved contact query to fallback storage:', contactData);
    res.status(201).json({ success: true, message: 'Message sent successfully! (Stored in temporary session memory)', data: contactData });
  } catch (error) {
    console.error('Error saving contact, using fallback:', error);
    mockContacts.push(contactData);
    res.status(201).json({ success: true, message: 'Message sent successfully! (Saved to fallback memory)', data: contactData });
  }
});

export default router;
