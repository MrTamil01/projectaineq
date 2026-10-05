import { inMemoryStore } from "../repository/inMemoryStore.js";

export const getEnterpriseData = (req, res) => {
  const users = inMemoryStore.getEnterpriseUsers();
  const sessions = inMemoryStore.getSessions();
  const securityEvents = inMemoryStore.getSecurityEvents();

  res.json({
    success: true,
    data: {
      organization: {
        name: "Acme 5G Corp",
        tier: "ENTERPRISE",
        totalSeats: 25,
        usedSeats: users.length,
        status: "Active SLA"
      },
      users,
      activeSessions: sessions.slice(0, 10),
      securityPolicies: [
        { id: "pol-01", name: "Strict TLS Framing", enabled: true, category: "Encryption" },
        { id: "pol-02", name: "Auto Packet Padding", enabled: true, category: "Morphing" },
        { id: "pol-03", name: "Entropy Threshold Enforcement (>7.8)", enabled: true, category: "Security" },
        { id: "pol-04", name: "Low-Latency Priority Mode", enabled: false, category: "Performance" }
      ],
      usage: {
        totalDataTransferredGB: 1240,
        averageLatencyMs: 16,
        securityScore: 95
      },
      securityEvents: securityEvents.slice(0, 5)
    }
  });
};

export const addEnterpriseUser = (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required.",
      errorCode: "VALIDATION_ERROR"
    });
  }

  const newUser = inMemoryStore.addEnterpriseUser({ name, email, role: role || "Security Analyst" });
  res.status(201).json({
    success: true,
    message: "Enterprise team member added successfully.",
    data: { user: newUser }
  });
};

export const removeEnterpriseUser = (req, res) => {
  const { id } = req.params;
  inMemoryStore.removeEnterpriseUser(id);
  res.json({
    success: true,
    message: `Enterprise user ${id} removed.`
  });
};
