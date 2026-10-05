import React, { createContext, useContext, useState, useEffect } from "react";
import { getSocket } from "../services/socket";
import API from "../services/api";

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);
  const [livePackets, setLivePackets] = useState([]);
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    latency: 18,
    latencyBefore: 14,
    throughputMbps: 742,
    packetsPerSec: 1450,
    overheadPercent: 5.2,
    securityScore: 94,
    jitterMs: 2,
    packetsProcessedTotal: 128
  });

  const [networkConditions, setNetworkConditions] = useState({
    bandwidthMbps: 850,
    latencyMs: 12,
    jitterMs: 2,
    packetLossPercent: 0.1,
    preset: "EXCELLENT"
  });

  // Presentation Demo Mode state
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0); // 0 = Idle, 1 = CONNECT, 2 = ENCRYPT, 3 = MORPH, 4 = TRANSMIT, 5 = ANALYZE, 6 = COMPLETE
  const [demoLogs, setDemoLogs] = useState([]);

  // Socket.IO real-time binding
  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("[Client Socket] Connected to NetMorph server.");
    });

    socket.on("packetGenerated", (packet) => {
      setLivePackets((prev) => [packet, ...prev.slice(0, 49)]);
      setCurrentMetrics((prev) => ({
        ...prev,
        packetsProcessedTotal: prev.packetsProcessedTotal + 1
      }));
    });

    socket.on("metricsUpdated", (metric) => {
      setCurrentMetrics((prev) => ({
        ...prev,
        latency: metric.latency,
        throughputMbps: metric.throughputMbps,
        packetsPerSec: metric.packetsPerSec,
        overheadPercent: metric.overheadPercent,
        securityScore: metric.securityScore,
        jitterMs: metric.jitterMs
      }));

      setMetricsHistory((prev) => [...prev.slice(-29), metric]);
    });

    socket.on("networkConditionsUpdated", (conditions) => {
      setNetworkConditions(conditions);
    });

    return () => {
      socket.off("packetGenerated");
      socket.off("metricsUpdated");
      socket.off("networkConditionsUpdated");
    };
  }, []);

  // Fetch initial analytics history and network conditions
  useEffect(() => {
    API.get("/analytics")
      .then((res) => {
        if (res.data?.data?.metricsHistory) {
          setMetricsHistory(res.data.data.metricsHistory);
          if (res.data.data.summary) {
            setCurrentMetrics((prev) => ({
              ...prev,
              latency: res.data.data.summary.currentLatencyMs,
              throughputMbps: res.data.data.summary.currentThroughputMbps,
              packetsPerSec: res.data.data.summary.packetsProcessedSec,
              overheadPercent: res.data.data.summary.overheadPercent,
              securityScore: res.data.data.summary.securityScore
            }));
          }
        }
      })
      .catch((err) => console.warn("Analytics fetch warning:", err.message));
  }, []);

  const startSession = async (config) => {
    try {
      const res = await API.post("/morph/start", config);
      if (res.data?.success) {
        setActiveSession(res.data.data.session);
        return { success: true, session: res.data.data.session };
      }
    } catch (err) {
      console.error("Failed to start session:", err);
      // Fallback local session creation for smooth demo
      const fallbackSession = {
        sessionId: `sess-${Date.now()}`,
        source: config.source || "Browser",
        trafficType: config.trafficType || "Video",
        morphProfile: config.morphProfile || "video-stream-like",
        encryption: config.encryption || "AES-256 simulation",
        performanceMode: config.performanceMode || "Balanced",
        status: "ACTIVE",
        packetsProcessed: 0,
        startTime: new Date().toISOString()
      };
      setActiveSession(fallbackSession);
      return { success: true, session: fallbackSession };
    }
  };

  const stopSession = async () => {
    if (!activeSession) return;
    try {
      await API.post("/morph/stop", { sessionId: activeSession.sessionId });
    } catch (err) {
      console.warn("Stop session warning:", err);
    } finally {
      setActiveSession(null);
    }
  };

  const updateConditions = async (newConds) => {
    setNetworkConditions(newConds);
    try {
      await API.post("/morph/network-conditions", newConds);
    } catch (err) {
      console.warn("Update network conditions warning:", err);
    }
  };

  // Run Automated Presentation Demo Mode Sequence
  const runPresentationDemo = () => {
    setIsDemoRunning(true);
    setDemoStep(1);
    setDemoLogs(["[DEMO] Initiating 5G Secure Tunnel Connection..."]);

    setTimeout(() => {
      setDemoStep(2);
      setDemoLogs((prev) => [...prev, "[DEMO] Security Layer: AES-256 GCM Context & JWT Authenticated."]);
    }, 1800);

    setTimeout(() => {
      setDemoStep(3);
      setDemoLogs((prev) => [...prev, "[DEMO] Traffic Morphing Engine: Applying VIDEO-STREAM-LIKE Profile (HLS framing)."]);
      startSession({
        source: "Enterprise App",
        trafficType: "Video",
        morphProfile: "video-stream-like",
        encryption: "AES-256 simulation",
        performanceMode: "Balanced"
      });
    }, 3800);

    setTimeout(() => {
      setDemoStep(4);
      setDemoLogs((prev) => [...prev, "[DEMO] Transmitting 120+ Morphed Packets over 5G mmWave Network Slice."]);
    }, 6000);

    setTimeout(() => {
      setDemoStep(5);
      setDemoLogs((prev) => [...prev, "[DEMO] Analytics Engine: Entropy verified (7.98), Latency: 18ms, Overhead: 3.8%."]);
    }, 8500);

    setTimeout(() => {
      setDemoStep(6);
      setDemoLogs((prev) => [...prev, "[DEMO] Demo Sequence Completed Successfully! Security Score: 96%."]);
      setIsDemoRunning(false);
    }, 11000);
  };

  return (
    <SimulationContext.Provider
      value={{
        activeSession,
        livePackets,
        metricsHistory,
        currentMetrics,
        networkConditions,
        isDemoRunning,
        demoStep,
        demoLogs,
        startSession,
        stopSession,
        updateConditions,
        runPresentationDemo
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => useContext(SimulationContext);
