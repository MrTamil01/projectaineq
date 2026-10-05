import { inMemoryStore } from "../repository/inMemoryStore.js";
import { emitSocketEvent } from "../services/socketService.js";

export const getSecurityOverview = (req, res) => {
  const events = inMemoryStore.getSecurityEvents();
  res.json({
    success: true,
    data: {
      encryptionStatus: "ACTIVE (AES-256-GCM)",
      authStatus: "JWT ACTIVE",
      sessionSecurity: "SECURE",
      transport: "TLS 1.3 SIMULATION",
      threatMonitoring: "ACTIVE",
      securityScore: 94,
      securityEvents: events
    }
  });
};

export const triggerSecurityAction = (req, res) => {
  const { action } = req.body;
  let newEvt = null;

  if (action === "ROTATE_KEY") {
    newEvt = inMemoryStore.addSecurityEvent({
      event: `Security key manually rotated by Operator. New Key ID: #SK-${Math.floor(1000 + Math.random() * 9000)}`,
      severity: "LOW",
      action: "KEY_ROTATED"
    });
  } else if (action === "VERIFY_ENTROPY") {
    newEvt = inMemoryStore.addSecurityEvent({
      event: "Manual entropy verification run: 7.97/8.00 (High Randomness Certified)",
      severity: "INFO",
      action: "ENTROPY_CHECK"
    });
  } else {
    newEvt = inMemoryStore.addSecurityEvent({
      event: `Simulated anomaly check triggered (${action || "GENERIC_CHECK"})`,
      severity: "INFO",
      action: "ANOMALY_CHECK"
    });
  }

  emitSocketEvent("securityEvent", newEvt);

  res.json({
    success: true,
    message: "Security action executed.",
    data: { event: newEvt }
  });
};
