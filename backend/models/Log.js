import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  sourceIp: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'LOW'
  },
  status: {
    type: String,
    enum: ['BLOCKED', 'LOGGED', 'CONTAINED', 'RESOLVED'],
    default: 'LOGGED'
  },
  targetPort: {
    type: Number,
    required: true
  }
});

export default mongoose.models.Log || mongoose.model('Log', LogSchema);
