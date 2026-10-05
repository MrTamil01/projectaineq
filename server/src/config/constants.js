export const PROTOCOL_PROFILES = [
  {
    id: "https-like",
    name: "HTTPS-LIKE",
    tag: "HTTPS / TLS 1.3",
    description: "Transforms payloads into standard TLS 1.3 encrypted web traffic patterns with fake SNI and standardized HTTP/2 framing.",
    packetPattern: "Fixed chunk sizes (1420B), periodic handshake keep-alives, TLS header wrapping.",
    avgLatencyMs: 14,
    expectedOverheadPercent: 5.2,
    recommendedUseCase: "Web browsing, enterprise web app security, hiding payload signatures in standard HTTPS flows.",
    icon: "Shield",
    active: true,
    targetEntropy: 7.95
  },
  {
    id: "dns-like",
    name: "DNS-LIKE",
    tag: "DNS over HTTPS / UDP",
    description: "Encapsulates traffic into small, query/response pairs mimicking DNS lookup requests and TXT record responses.",
    packetPattern: "Small burst packets (64B-512B), high frequency, rapid request-response cadence.",
    avgLatencyMs: 8,
    expectedOverheadPercent: 14.8,
    recommendedUseCase: "Ultra-low latency micro-messaging, IoT sensor signaling, heartbeat keep-alives.",
    icon: "Network",
    active: true,
    targetEntropy: 7.85
  },
  {
    id: "video-stream-like",
    name: "VIDEO-STREAM-LIKE",
    tag: "HLS / MPEG-DASH",
    description: "Mimics adaptive bitrate video streaming traffic with bursty segment downloads and sustained high throughput.",
    packetPattern: "Large sequential bursts (4KB-64KB), burst interval 2s, continuous buffer fill pattern.",
    avgLatencyMs: 22,
    expectedOverheadPercent: 3.8,
    recommendedUseCase: "Bulk file transfers, database syncs, high-bandwidth secure streaming workloads.",
    icon: "Video",
    active: true,
    targetEntropy: 7.98
  },
  {
    id: "gaming-like",
    name: "GAMING-LIKE",
    tag: "UDP Real-Time Gaming",
    description: "Simulates ultra-low latency real-time multiplayer UDP state updates with high tick-rate packet streams.",
    packetPattern: "Tiny uniform packets (128B-256B) sent at strict 60Hz tick intervals with minimal delay.",
    avgLatencyMs: 10,
    expectedOverheadPercent: 8.5,
    recommendedUseCase: "Interactive low-latency applications, voice over IP (VoIP), financial execution feeds.",
    icon: "Gamepad2",
    active: true,
    targetEntropy: 7.91
  }
];

export const NETWORK_PRESETS = {
  EXCELLENT: { bandwidthMbps: 850, latencyMs: 12, jitterMs: 2, packetLossPercent: 0.1, label: "5G mmWave Excellent" },
  GOOD: { bandwidthMbps: 450, latencyMs: 25, jitterMs: 5, packetLossPercent: 0.5, label: "5G Sub-6GHz Good" },
  AVERAGE: { bandwidthMbps: 120, latencyMs: 50, jitterMs: 12, packetLossPercent: 1.5, label: "5G Standard / LTE Advanced" },
  POOR: { bandwidthMbps: 25, latencyMs: 120, jitterMs: 35, packetLossPercent: 4.5, label: "Degraded 5G Edge / Congested" }
};

export const INITIAL_SECURITY_EVENTS = [
  {
    id: "sec-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    event: "Session authentication verified via JWT (AES-256 context initialized)",
    severity: "INFO",
    action: "SESSION_ESTABLISHED"
  },
  {
    id: "sec-002",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    event: "Traffic entropy check passed (Entropy 7.96 / 8.00 - High Randomness)",
    severity: "INFO",
    action: "ENTROPY_VERIFIED"
  },
  {
    id: "sec-003",
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    event: "Dynamic encryption key auto-rotated (Session Key ID: #SK-9942)",
    severity: "LOW",
    action: "KEY_ROTATED"
  },
  {
    id: "sec-004",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    event: "Simulated packet size anomaly normalized by morphing shaper",
    severity: "MEDIUM",
    action: "PADDING_SHAPED"
  },
  {
    id: "sec-005",
    timestamp: new Date().toISOString(),
    event: "5G gNodeB Handover simulation complete — Security state intact",
    severity: "INFO",
    action: "HANDOVER_VERIFIED"
  }
];
