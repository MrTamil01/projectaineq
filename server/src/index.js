import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { initSocket } from "./services/socketService.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import morphRoutes from "./routes/morphRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import enterpriseRoutes from "./routes/enterpriseRoutes.js";
import apiDocsRoutes from "./routes/apiDocsRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: "Too many requests, please try again later.", errorCode: "RATE_LIMITED" }
});
app.use("/api/", limiter);

// Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/morph", morphRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/enterprise", enterpriseRoutes);
app.use("/api/docs", apiDocsRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NetMorph 5G Platform API Operational.",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Central Error Handler
app.use(errorHandler);

// Initialize Socket.IO
initSocket(server);

// Connect DB & Start Server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(` NETMORPH — 5G-Native Secure Traffic Morphing`);
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(` WebSocket server active`);
    console.log(`=================================================`);
  });
});
