import mongoose from "mongoose";

const securityEventSchema = new mongoose.Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  event: { type: String, required: true },
  severity: { type: String, enum: ["INFO", "LOW", "MEDIUM", "HIGH"], default: "INFO" },
  action: { type: String, default: "LOG" }
});

export const SecurityEvent = mongoose.models.SecurityEvent || mongoose.model("SecurityEvent", securityEventSchema);
