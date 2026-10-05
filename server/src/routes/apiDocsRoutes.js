import express from "express";

const router = express.Router();

const API_ENDPOINTS = [
  {
    method: "POST",
    path: "/api/auth/register",
    description: "Register a new user in NetMorph system",
    requestBody: { name: "John Doe", email: "user@example.com", password: "password123", role: "USER" },
    response: { success: true, message: "Registration successful", data: { token: "<JWT>", user: {} } }
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticate user and receive JWT access token",
    requestBody: { email: "demo@netmorph.io", password: "password123" },
    response: { success: true, message: "Login successful", data: { token: "<JWT>", user: {} } }
  },
  {
    method: "GET",
    path: "/api/sessions",
    description: "Fetch list of active and historical traffic morphing sessions",
    response: { success: true, data: { sessions: [] } }
  },
  {
    method: "POST",
    path: "/api/morph/start",
    description: "Initialize and start a controlled simulated traffic morphing session",
    requestBody: { source: "Browser", trafficType: "Video", morphProfile: "video-stream-like", performanceMode: "Balanced" },
    response: { success: true, message: "Pipeline activated", data: { session: {} } }
  },
  {
    method: "POST",
    path: "/api/morph/stop",
    description: "Terminate an active traffic morphing session",
    requestBody: { sessionId: "sess-12345" },
    response: { success: true, message: "Pipeline stopped", data: { session: {} } }
  },
  {
    method: "GET",
    path: "/api/morph/profiles",
    description: "Get available protocol morphing profiles (HTTPS-like, DNS-like, Video, Gaming)",
    response: { success: true, data: { profiles: [] } }
  },
  {
    method: "GET",
    path: "/api/analytics",
    description: "Retrieve real-time and historical performance analytics metrics",
    response: { success: true, data: { metricsHistory: [], summary: {} } }
  },
  {
    method: "GET",
    path: "/api/security/events",
    description: "Get current security status, encryption parameters, and security event log timeline",
    response: { success: true, data: { encryptionStatus: "ACTIVE", securityScore: 94, securityEvents: [] } }
  },
  {
    method: "GET",
    path: "/api/provider/metrics",
    description: "Retrieve telecom provider monetization metrics, subscriber counts, and service tier specifications",
    response: { success: true, data: { metrics: {}, serviceTiers: [] } }
  }
];

router.get("/endpoints", (req, res) => {
  res.json({
    success: true,
    data: { endpoints: API_ENDPOINTS }
  });
});

export default router;
