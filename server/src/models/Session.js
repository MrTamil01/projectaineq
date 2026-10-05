import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, default: "usr-demo-001" },
  userName: { type: String, default: "Demo Operator" },
  source: { type: String, default: "Browser" },
  trafficType: { type: String, default: "Web" },
  morphProfile: { type: String, default: "https-like" },
  encryption: { type: String, default: "AES-256 simulation" },
  performanceMode: { type: String, default: "Balanced" },
  status: { type: String, enum: ["ACTIVE", "PAUSED", "COMPLETED", "TERMINATED"], default: "ACTIVE" },
  packetsProcessed: { type: Number, default: 0 },
  bytesProcessed: { type: Number, default: 0 },
  avgLatencyMs: { type: Number, default: 18 },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date }
});

export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
