import mongoose from "mongoose";

const analyticsMetricSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  latency: { type: Number, required: true },
  latencyBefore: { type: Number, required: true },
  throughputMbps: { type: Number, required: true },
  packetsPerSec: { type: Number, required: true },
  overheadPercent: { type: Number, required: true },
  securityScore: { type: Number, required: true },
  jitterMs: { type: Number, required: true }
});

export const AnalyticsMetric = mongoose.models.AnalyticsMetric || mongoose.model("AnalyticsMetric", analyticsMetricSchema);
