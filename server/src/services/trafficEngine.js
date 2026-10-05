import { inMemoryStore } from "../repository/inMemoryStore.js";
import { isMongoAvailable } from "../config/db.js";
import { Session } from "../models/Session.js";
import { TrafficPacket } from "../models/TrafficPacket.js";
import { emitSocketEvent } from "./socketService.js";
import trafficMorpher from "./trafficMorpher.js";

class TrafficMorphingEngine {
  constructor() {
    this.activeIntervals = new Map();
    this.simulatedNetworkConditions = {
      bandwidthMbps: 850,
      latencyMs: 12,
      jitterMs: 2,
      packetLossPercent: 0.1,
      preset: "EXCELLENT"
    };
  }

  // Set active 5G network condition simulation parameters
  setNetworkConditions(conditions) {
    this.simulatedNetworkConditions = { ...this.simulatedNetworkConditions, ...conditions };
    emitSocketEvent("networkConditionsUpdated", this.simulatedNetworkConditions);
    return this.simulatedNetworkConditions;
  }

  getNetworkConditions() {
    return this.simulatedNetworkConditions;
  }

  // 1. createSession
  async createSession(config) {
    const {
      userId = "usr-demo-001",
      userName = "Demo Operator",
      source = "Browser",
      trafficType = "Video",
      morphProfile = "video-stream-like",
      sourceProfile = "WEB_TRAFFIC",
      targetProfile = "VIDEO_LIKE",
      encryption = "AES-256 simulation",
      performanceMode = "Balanced",
      packetCount = 100,
      packetSize = 1200,
      bandwidth = 500,
      latency = 18
    } = config;

    const targetProfileNormalized = targetProfile || morphProfile || "VIDEO_LIKE";
    const baseLatency = this.calculateLatency(morphProfile, performanceMode, latency);

    const sessionData = {
      sessionId: `sess-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      userName,
      source,
      trafficType,
      sourceProfile,
      targetProfile: targetProfileNormalized,
      morphProfile,
      encryption,
      performanceMode,
      status: "ACTIVE",
      packetsProcessed: 0,
      bytesProcessed: 0,
      avgLatencyMs: baseLatency,
      packetCount,
      packetSize,
      bandwidth,
      latency,
      startTime: new Date().toISOString()
    };

    let session;
    if (isMongoAvailable) {
      try {
        session = await Session.create(sessionData);
      } catch (err) {
        session = inMemoryStore.createSession(sessionData);
      }
    } else {
      session = inMemoryStore.createSession(sessionData);
    }

    // Register auto background packet streamer for active demo visualization
    this.startSessionStream(session.sessionId || sessionData.sessionId, sessionData);

    emitSocketEvent("sessionStarted", session);
    return session;
  }

  // Start periodic packet generator loop for active session
  startSessionStream(sessionId, config) {
    if (this.activeIntervals.has(sessionId)) {
      clearInterval(this.activeIntervals.get(sessionId));
    }

    const interval = setInterval(async () => {
      try {
        const packet = await this.generatePacket(sessionId, config);
        emitSocketEvent("packetGenerated", packet);
        emitSocketEvent("packetEncrypted", { packetId: packet.packetId, encryption: config.encryption });
        emitSocketEvent("packetMorphed", { packetId: packet.packetId, profile: packet.morphProfile });
        emitSocketEvent("packetDelivered", packet);

        // Periodically record metrics
        const metrics = this.recordMetrics(packet);
        emitSocketEvent("metricsUpdated", metrics);
      } catch (err) {
        console.error(`[TrafficEngine] Packet generation error: ${err.message}`);
      }
    }, 1500);

    this.activeIntervals.set(sessionId, interval);
  }

  // 2. generatePacket
  async generatePacket(sessionId, config = {}) {
    const rawType = config.trafficType || "Web";
    const morphProfile = config.morphProfile || "https-like";
    const targetProfile = config.targetProfile || config.morphProfile || "VIDEO_LIKE";
    const sourceProfile = config.sourceProfile || "WEB_TRAFFIC";
    const packetSize = Number(config.packetSize) || 1200;
    const bandwidth = Number(config.bandwidth) || 500;
    const latencyValue = Number(config.latency) || 18;

    // Step 1: Raw payload size generation
    let rawSize = packetSize;
    switch (rawType.toLowerCase()) {
      case "video":
        rawSize = Math.floor(4096 + Math.random() * 16384);
        break;
      case "gaming":
        rawSize = Math.floor(128 + Math.random() * 256);
        break;
      case "dns query":
      case "dns":
        rawSize = Math.floor(64 + Math.random() * 192);
        break;
      case "file transfer":
        rawSize = Math.floor(8192 + Math.random() * 32768);
        break;
      default:
        rawSize = Math.floor(512 + Math.random() * 2048);
    }

    const simulation = trafficMorpher.simulatePacket({
      sourceProfile,
      targetProfile,
      packetSize: rawSize,
      bandwidth,
      latency: latencyValue,
      packetCount: Number(config.packetCount) || 1,
      sequenceNumber: Math.floor(Math.random() * 10000)
    });

    // Step 2: Encrypt Payload Simulation
    const encrypted = this.encryptPayload(rawSize, config.encryption || "AES-256 simulation");

    // Step 3: Apply Morph Profile (Header wrapping & padding)
    const morphed = this.applyMorphProfile(encrypted.encryptedSize, morphProfile);

    // Step 4: Calculate Overhead & Latency
    const overheadPercent = this.calculateOverhead(rawSize, morphed.transformedSize);
    const latency = this.calculateLatency(morphProfile, config.performanceMode, latencyValue);

    const packet = {
      packetId: `PKT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 90 + 10)}`,
      sessionId,
      timestamp: new Date().toISOString(),
      originalType: rawType,
      sourceProfile: simulation.sourceProfile,
      targetProfile: simulation.targetProfile,
      morphProfile,
      originalSize: rawSize,
      morphedSize: simulation.morphedSize,
      transformedSize: morphed.transformedSize,
      originalInterval: simulation.originalInterval,
      morphedInterval: simulation.morphedInterval,
      entropy: morphed.entropy,
      latency,
      overheadPercent,
      protocolLabel: simulation.protocolLabel,
      status: "DELIVERED",
      simulated: true
    };

    // Store packet
    if (isMongoAvailable) {
      try {
        await TrafficPacket.create(packet);
      } catch (e) {
        inMemoryStore.addPacket(packet);
      }
    } else {
      inMemoryStore.addPacket(packet);
    }

    // Update Session Counters
    const sess = inMemoryStore.getSessionById(sessionId);
    if (sess) {
      sess.packetsProcessed = (sess.packetsProcessed || 0) + 1;
      sess.bytesProcessed = (sess.bytesProcessed || 0) + morphed.transformedSize;
    }

    return packet;
  }

  // 3. encryptPayload
  encryptPayload(rawSize, encryptionType) {
    // Encrypted payload adds minimal cryptographic MAC tag overhead (e.g. 16 to 32 bytes)
    const tagSize = encryptionType.includes("AES-256") ? 28 : 20;
    return {
      encryptedSize: rawSize + tagSize,
      cipher: "AES-256-GCM (Simulated)"
    };
  }

  // 4. applyMorphProfile
  applyMorphProfile(size, morphProfile) {
    let padding = 0;
    let entropy = 7.92;

    switch (morphProfile) {
      case "dns-like":
        // Padded to nearest DNS response chunk (e.g. 256 or 512 bytes)
        padding = (512 - (size % 512)) % 512;
        entropy = 7.85;
        break;
      case "video-stream-like":
        // Video segment chunking (burst padding)
        padding = Math.floor(128 + Math.random() * 512);
        entropy = 7.98;
        break;
      case "gaming-like":
        // Fixed 256-byte tick frames
        padding = (256 - (size % 256)) % 256;
        entropy = 7.91;
        break;
      case "https-like":
      default:
        // TLS 1.3 record size padding (1420 bytes MTU shaper)
        padding = (1420 - (size % 1420)) % 1420;
        entropy = 7.95;
        break;
    }

    return {
      transformedSize: size + padding,
      paddingApplied: padding,
      entropy
    };
  }

  // 5. calculateOverhead
  calculateOverhead(originalSize, transformedSize) {
    if (originalSize === 0) return 0;
    const diff = transformedSize - originalSize;
    return parseFloat(((diff / originalSize) * 100).toFixed(2));
  }

  // 6. calculateLatency
  calculateLatency(morphProfile, performanceMode = "Balanced", overrideLatency = null) {
    const net = this.simulatedNetworkConditions;
    let base = overrideLatency ?? net.latencyMs;

    // Profile-specific processing impact
    if (morphProfile === "dns-like") base += 2;
    else if (morphProfile === "video-stream-like") base += 6;
    else if (morphProfile === "gaming-like") base += 1;
    else base += 3;

    // Mode modifier
    if (performanceMode === "Low Latency") base *= 0.85;
    if (performanceMode === "High Throughput") base *= 1.15;

    // Jitter component
    const jitter = (Math.random() - 0.5) * net.jitterMs * 2;
    return Math.max(4, Math.floor(base + jitter));
  }

  // 7. recordMetrics
  recordMetrics(lastPacket) {
    const net = this.simulatedNetworkConditions;
    const point = {
      timestamp: new Date().toLocaleTimeString(),
      latency: lastPacket ? lastPacket.latency : net.latencyMs,
      latencyBefore: lastPacket ? Math.max(4, lastPacket.latency - 4) : net.latencyMs - 3,
      throughputMbps: Math.floor(net.bandwidthMbps * (0.8 + Math.random() * 0.3)),
      packetsPerSec: Math.floor(1200 + Math.random() * 800),
      overheadPercent: lastPacket ? lastPacket.overheadPercent : 5.2,
      securityScore: Math.floor(93 + Math.random() * 5),
      jitterMs: net.jitterMs
    };

    inMemoryStore.addAnalyticsPoint(point);
    return point;
  }

  // 8. terminateSession
  terminateSession(sessionId) {
    if (this.activeIntervals.has(sessionId)) {
      clearInterval(this.activeIntervals.get(sessionId));
      this.activeIntervals.delete(sessionId);
    }
    const session = inMemoryStore.terminateSession(sessionId);
    emitSocketEvent("sessionEnded", { sessionId, status: "TERMINATED" });
    return session;
  }
}

export const trafficMorphingEngine = new TrafficMorphingEngine();
