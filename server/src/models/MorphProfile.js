import mongoose from "mongoose";

const morphProfileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tag: { type: String },
  description: { type: String },
  packetPattern: { type: String },
  avgLatencyMs: { type: Number },
  expectedOverheadPercent: { type: Number },
  recommendedUseCase: { type: String },
  active: { type: Boolean, default: true }
});

export const MorphProfile = mongoose.models.MorphProfile || mongoose.model("MorphProfile", morphProfileSchema);
