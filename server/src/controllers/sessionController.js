import { inMemoryStore } from "../repository/inMemoryStore.js";
import { isMongoAvailable } from "../config/db.js";
import { Session } from "../models/Session.js";
import { TrafficPacket } from "../models/TrafficPacket.js";
import { trafficMorphingEngine } from "../services/trafficEngine.js";

export const getSessions = async (req, res, next) => {
  try {
    let sessions = [];
    if (isMongoAvailable) {
      try {
        sessions = await Session.find().sort({ startTime: -1 });
      } catch (err) {
        sessions = inMemoryStore.getSessions();
      }
    } else {
      sessions = inMemoryStore.getSessions();
    }

    res.json({
      success: true,
      message: "Sessions retrieved successfully.",
      data: { sessions }
    });
  } catch (err) {
    next(err);
  }
};

export const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let session = null;
    let packets = [];

    if (isMongoAvailable) {
      try {
        session = await Session.findOne({ sessionId: id });
        packets = await TrafficPacket.find({ sessionId: id }).limit(50);
      } catch (err) {
        session = inMemoryStore.getSessionById(id);
        packets = inMemoryStore.getPacketsBySession(id);
      }
    } else {
      session = inMemoryStore.getSessionById(id);
      packets = inMemoryStore.getPacketsBySession(id);
    }

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found.",
        errorCode: "SESSION_NOT_FOUND"
      });
    }

    res.json({
      success: true,
      data: { session, packets }
    });
  } catch (err) {
    next(err);
  }
};

export const startSession = async (req, res, next) => {
  try {
    const config = req.body;
    const session = await trafficMorphingEngine.createSession(config);
    res.status(201).json({
      success: true,
      message: "Morphing session created and started.",
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};

export const createSession = async (req, res, next) => {
  try {
    const config = req.body;
    const session = await trafficMorphingEngine.createSession(config);
    res.status(201).json({
      success: true,
      message: "Morphing session created and started.",
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};

export const stopSession = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const id = req.params?.id || sessionId;
    const session = trafficMorphingEngine.terminateSession(id);
    res.json({
      success: true,
      message: `Session ${id} terminated successfully.`,
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};

export const terminateSession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const session = trafficMorphingEngine.terminateSession(id);
    res.json({
      success: true,
      message: `Session ${id} terminated successfully.`,
      data: { session }
    });
  } catch (err) {
    next(err);
  }
};
