import express from "express";
import rateLimit from "express-rate-limit";
import { analyzeNetwork } from "../controllers/aiController.js";

const router = express.Router();

// Apply a stricter rate limit for AI endpoint to prevent API abuse
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 AI requests per window
  message: { 
    success: false, 
    message: "Too many AI analysis requests, please try again later." 
  }
});

// Enforce a strict body size limit for AI requests
router.post(
  "/analyze-network", 
  aiLimiter, 
  express.json({ limit: "50kb" }), 
  analyzeNetwork
);

export default router;
