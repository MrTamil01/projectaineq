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
    targetEntropy: 7.91
  }
];
