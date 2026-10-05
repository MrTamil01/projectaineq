const PROFILE_MAP = {
  DNS_LIKE: {
    label: "DNS_LIKE",
    protocolLabel: "DNS",
    sizeMultiplier: 0.18,
    intervalScale: 1.7,
    burstiness: 0.78,
    bandwidthBias: 0.2,
    privacyBias: 0.3
  },
  HTTPS_LIKE: {
    label: "HTTPS_LIKE",
    protocolLabel: "HTTPS",
    sizeMultiplier: 0.62,
    intervalScale: 1.15,
    burstiness: 0.5,
    bandwidthBias: 0.66,
    privacyBias: 0.55
  },
  VIDEO_LIKE: {
    label: "VIDEO_LIKE",
    protocolLabel: "VIDEO",
    sizeMultiplier: 1.8,
    intervalScale: 0.8,
    burstiness: 0.9,
    bandwidthBias: 1.55,
    privacyBias: 0.85
  },
  GAMING_LIKE: {
    label: "GAMING_LIKE",
    protocolLabel: "GAMING",
    sizeMultiplier: 0.42,
    intervalScale: 0.68,
    burstiness: 1.1,
    bandwidthBias: 1.2,
    privacyBias: 0.78
  },
  WEB_TRAFFIC: {
    label: "WEB_TRAFFIC",
    protocolLabel: "WEB",
    sizeMultiplier: 0.7,
    intervalScale: 1,
    burstiness: 0.65,
    bandwidthBias: 0.75,
    privacyBias: 0.6
  }
};

const normalizeProfile = (value) => {
  const normalized = String(value || "HTTPS_LIKE").trim().toUpperCase();
  const key = normalized.replace(/[^A-Z_]/g, "");
  return PROFILE_MAP[key] || PROFILE_MAP.HTTPS_LIKE;
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const trafficMorpher = {
  PROFILE_MAP,
  normalizeProfile,

  simulatePacket(input = {}) {
    const sourceProfile = normalizeProfile(input.sourceProfile || "WEB_TRAFFIC");
    const targetProfile = normalizeProfile(input.targetProfile || "VIDEO_LIKE");
    const originalSize = Number(input.packetSize) || 1200;
    const latency = Number(input.latency) || 18;
    const bandwidth = Number(input.bandwidth) || 500;
    const packetCount = Number(input.packetCount) || 1;
    const sequenceNumber = Number(input.sequenceNumber) || 1;

    const originalInterval = clamp(1000 / Math.max(1, bandwidth / 120), 20, 2000);
    const burstAdjustment = clamp(targetProfile.burstiness / sourceProfile.burstiness, 0.4, 2.8);
    const morphedSize = Math.max(64, Math.round(originalSize * targetProfile.sizeMultiplier * (1 + burstAdjustment * 0.15)));
    const morphedInterval = clamp(originalInterval / (targetProfile.intervalScale * (1 + (packetCount / 1000))), 8, 1500);

    return {
      packetId: `pkt-${Date.now()}-${String(sequenceNumber).padStart(4, "0")}`,
      timestamp: new Date().toISOString(),
      sourceProfile: sourceProfile.label,
      targetProfile: targetProfile.label,
      originalSize,
      morphedSize,
      originalInterval: Number(originalInterval.toFixed(2)),
      morphedInterval: Number(morphedInterval.toFixed(2)),
      latency,
      sequenceNumber,
      protocolLabel: targetProfile.protocolLabel,
      simulated: true
    };
  },

  generatePacketBatch(input = {}) {
    const sourceProfile = normalizeProfile(input.sourceProfile || "WEB_TRAFFIC");
    const targetProfile = normalizeProfile(input.targetProfile || "VIDEO_LIKE");
    const packetCount = Math.max(1, Number(input.packetCount) || 50);
    const packetSize = Number(input.packetSize) || 1200;
    const bandwidth = Number(input.bandwidth) || 500;
    const latency = Number(input.latency) || 18;

    const packets = Array.from({ length: packetCount }, (_, index) =>
      this.simulatePacket({
        sourceProfile: sourceProfile.label,
        targetProfile: targetProfile.label,
        packetSize,
        bandwidth,
        latency,
        packetCount,
        sequenceNumber: index + 1
      })
    );

    const averageOriginalSize = packets.reduce((sum, packet) => sum + packet.originalSize, 0) / packets.length;
    const averageMorphedSize = packets.reduce((sum, packet) => sum + packet.morphedSize, 0) / packets.length;
    const averageInterval = packets.reduce((sum, packet) => sum + packet.morphedInterval, 0) / packets.length;
    const privacyScore = clamp(100 - ((averageMorphedSize - averageOriginalSize) / Math.max(1, averageOriginalSize)) * 140, 35, 99);

    return {
      sourceProfile: sourceProfile.label,
      targetProfile: targetProfile.label,
      packetCount,
      packets,
      summary: {
        averageOriginalSize: Number(averageOriginalSize.toFixed(2)),
        averageMorphedSize: Number(averageMorphedSize.toFixed(2)),
        averageInterval: Number(averageInterval.toFixed(2)),
        privacyScore: Number(privacyScore.toFixed(2)),
        bandwidth,
        latency,
        simulated: true
      }
    };
  }
};

export default trafficMorpher;
