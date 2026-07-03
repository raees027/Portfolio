import express from 'express';
import Contact from '../models/Contact.js';
import Log from '../models/Log.js';

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

// Helper to check if Mongoose is connected
const isMongoConnected = () => {
  return typeof window === 'undefined' && Contact.db && Contact.db.readyState === 1;
};

// Projects list (MERN project details)
const projects = [
  {
    id: 1,
    title: "Movie Dashboard",
    description: "A high-performance full-stack MERN application for movie data ingestion, search, and pagination. Features advanced search filters, user-specific data tracking, and dynamic analytics.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS"],
    highlights: [
      "Designed dynamic pagination and pagination cursors for handling dataset sizes efficiently.",
      "Implemented JWT-based secure user state authentication and route-guards.",
      "Optimized React render trees to eliminate unnecessary component re-renders.",
      "Logged and tracked server status metrics dynamically."
    ],
    github: "https://github.com",
    live: "https://movie-dashboard-demo.com"
  },
  {
    id: 2,
    title: "Cyber Security SOC Dashboard",
    description: "A dashboard designed for incident monitoring, tracking security telemetry, logs, and SIEM triggers. Fully integrated with automated scripts.",
    tech: ["React.js", "Tailwind CSS", "Recharts", "Node.js", "Express.js", "Mongoose"],
    highlights: [
      "Simulates threat analysis telemetry visual logs.",
      "Interactive shell console terminal mimicking bash CLI.",
      "Includes responsive chart visualizers for security metrics."
    ],
    github: "https://github.com",
    live: "#"
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
    // Fallback to mock logs
    res.json(mockLogs);
  } catch (error) {
    console.error('Error fetching logs, returning mock data:', error);
    res.json(mockLogs);
  }
});

// POST SOC Log
router.post('/logs', async (req, res) => {
  const { sourceIp, event, severity, status, targetPort } = req.body;
  const newLog = {
    timestamp: new Date(),
    sourceIp: sourceIp || '127.0.0.1',
    event: event || 'Simulated Port Scan',
    severity: severity || 'LOW',
    status: status || 'LOGGED',
    targetPort: targetPort || 80
  };

  try {
    if (isMongoConnected()) {
      const savedLog = await Log.create(newLog);
      return res.status(201).json(savedLog);
    }
    // Fallback
    mockLogs.unshift(newLog);
    if (mockLogs.length > 30) mockLogs.pop();
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error saving log, using fallback:', error);
    mockLogs.unshift(newLog);
    res.status(201).json(newLog);
  }
});

// POST Contact Form
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email and message.' });
  }

  const contactData = { name, email, subject, message, createdAt: new Date() };

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
