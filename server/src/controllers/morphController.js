import { PROTOCOL_PROFILES, NETWORK_PRESETS } from "../config/constants.js";
import { trafficMorphingEngine } from "../services/trafficEngine.js";
import trafficMorpher from "../services/trafficMorpher.js";
import { inMemoryStore } from "../repository/inMemoryStore.js";

export const startMorph = async (req, res, next) => {
  try {
    const session = await trafficMorphingEngine.createSession(req.body);
    res.json({
      success: true,
      message: "Traffic morphing pipeline activated.",
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};

export const stopMorph = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const session = trafficMorphingEngine.terminateSession(sessionId);
    res.json({
      success: true,
      message: "Traffic morphing pipeline stopped.",
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};

export const getMorphSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const session = inMemoryStore.getSessions().find((entry) => entry.sessionId === sessionId || entry.id === sessionId);
    const packets = session ? inMemoryStore.getPacketsBySession(sessionId, 50) : [];

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Morph session not found.",
        errorCode: "SESSION_NOT_FOUND"
      });
    }

    const simulation = trafficMorpher.generatePacketBatch({
      sourceProfile: session.sourceProfile || session.trafficType || "WEB_TRAFFIC",
      targetProfile: session.morphProfile || "VIDEO_LIKE",
      packetCount: session.packetsProcessed || 25,
      packetSize: session.packetSize || 1200,
      bandwidth: session.bandwidth || 500,
      latency: session.latency || 18
    });

    res.json({
      success: true,
      data: {
        session,
        packets,
        simulation,
        privacyScore: simulation.summary.privacyScore
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getProfiles = (req, res) => {
  res.json({
    success: true,
    data: { profiles: PROTOCOL_PROFILES }
  });
};

export const getNetworkConditions = (req, res) => {
  const current = trafficMorphingEngine.getNetworkConditions();
  res.json({
    success: true,
    data: { conditions: current, presets: NETWORK_PRESETS }
  });
};

export const updateNetworkConditions = (req, res) => {
  const updated = trafficMorphingEngine.setNetworkConditions(req.body);
  res.json({
    success: true,
    message: "5G network conditions updated.",
    data: { conditions: updated }
  });
};
