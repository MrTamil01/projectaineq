import mongoose from "mongoose";

const trafficPacketSchema = new mongoose.Schema({
  packetId: { type: String, required: true },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  originalType: { type: String, required: true },
  morphProfile: { type: String, required: true },
  originalSize: { type: Number, required: true },
  transformedSize: { type: Number, required: true },
  latency: { type: Number, required: true },
  overheadPercent: { type: Number, required: true },
  status: { type: String, enum: ["PROCESSED", "ENCRYPTED", "TRANSFORMED", "DELIVERED"], default: "DELIVERED" }
});

export const TrafficPacket = mongoose.models.TrafficPacket || mongoose.model("TrafficPacket", trafficPacketSchema);
