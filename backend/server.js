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
