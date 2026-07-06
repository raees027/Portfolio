import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Strict Security Headers Middleware (CSP)
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' http://localhost:5000 http://localhost:3005; frame-ancestors 'none';"
  );
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Custom Sliding-Window Rate Limiter Middleware (Anti-DDoS / Spam)
const ipRequestWindow = new Map();
const LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_MIN = 60;

app.use((req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();

  if (!ipRequestWindow.has(ip)) {
    ipRequestWindow.set(ip, []);
  }

  const timestamps = ipRequestWindow.get(ip).filter(time => now - time < LIMIT_WINDOW_MS);
  timestamps.push(now);
  ipRequestWindow.set(ip, timestamps);

  if (timestamps.length > MAX_REQUESTS_PER_MIN) {
    return res.status(429).json({ error: 'Too many requests. Please wait before retrying.' });
  }

  next();
});

// Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED/OFFLINE_FALLBACK',
    timestamp: new Date()
  });
});

// Try to connect to MongoDB, fallback gracefully if fails
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri);
    console.log('>>> MongoDB Connected Successfully.');
  } catch (err) {
    console.warn(`>>> MongoDB Connection Warning: ${err.message}`);
    console.warn('>>> Backend server will continue running using in-memory mock fallback databases.');
  }
};

// Start Express Server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  SOC API Server running on port ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Health Check: http://localhost:${PORT}/health`);
    console.log(`=========================================`);
  });
};

const init = async () => {
  await connectDB();
  startServer();
};

init();
