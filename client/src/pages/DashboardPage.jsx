import React from "react";
import {
  Activity,
  Radio,
  Lock,
  ShieldCheck,
  Zap,
  HardDrive,
  Sliders,
  PlaySquare,
  BarChart2,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useSimulation } from "../context/SimulationContext";
import PacketFlowVisualizer from "../components/PacketFlowVisualizer";
import PacketTable from "../components/PacketTable";
import AINetworkAnalysisPanel from "../components/AINetworkAnalysisPanel";

export default function DashboardPage({ setActivePage }) {
  const { activeSession, currentMetrics, livePackets, runPresentationDemo } = useSimulation();

  const kpis = [
    {
      label: "Connection Status",
      value: "CONNECTED",
      subText: "5G gNodeB Sub-6GHz",
      icon: Radio,
      color: "text-emerald-400",
      bg: "bg-emerald-950/30 border-emerald-800/40"
    },
    {
      label: "Morphing Status",
      value: activeSession ? "ACTIVE" : "IDLE / READY",
      subText: activeSession ? activeSession.morphProfile.toUpperCase() : "Ready to Morph",
      icon: Activity,
      color: activeSession ? "text-cyan-400 animate-pulse" : "text-slate-400",
      bg: activeSession ? "bg-cyan-950/40 border-cyan-500/40" : "bg-slate-900 border-slate-800"
    },
    {
      label: "Encryption Envelope",
      value: "AES-256 GCM",
      subText: "TLS 1.3 Wrapping",
      icon: Lock,
      color: "text-indigo-400",
      bg: "bg-indigo-950/30 border-indigo-800/40"
    },
    {
      label: "Current Latency",
      value: `${currentMetrics.latency} ms`,
      subText: `Jitter: ${currentMetrics.jitterMs}ms`,
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-950/30 border-amber-800/40"
    },
    {
      label: "Current Throughput",
      value: `${currentMetrics.throughputMbps} Mbps`,
      subText: "5G Slice QoS Priority",
      icon: Zap,
      color: "text-blue-400",
      bg: "bg-blue-950/30 border-blue-800/40"
    },
    {
      label: "Packets Processed",
      value: currentMetrics.packetsProcessedTotal || 128,
      subText: `${currentMetrics.packetsPerSec} pkt/sec`,
      icon: HardDrive,
      color: "text-purple-400",
      bg: "bg-purple-950/30 border-purple-800/40"
    },
    {
      label: "Traffic Overhead",
      value: `+${currentMetrics.overheadPercent}%`,
      subText: "Padded Entropy Shaper",
      icon: BarChart2,
      color: "text-cyan-400",
      bg: "bg-cyan-950/30 border-cyan-800/40"
    },
    {
      label: "Security Score",
      value: `${currentMetrics.securityScore} / 100`,
      subText: "Entropy Verified 7.96",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-950/40 border-emerald-500/40"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>5G Security & Traffic Morphing Dashboard</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              OPERATIONAL
            </span>
          </h2>
          <p className="text-xs text-slate-400">Live operational oversight of encrypted traffic morphing metrics & 5G network performance</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage("traffic-console")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4" />
            <span>Open Morphing Console</span>
          </button>

          <button
            onClick={() => {
              setActivePage("demo-mode");
              runPresentationDemo();
            }}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-semibold text-xs transition flex items-center gap-1.5"
          >
            <PlaySquare className="w-4 h-4 text-cyan-400" />
            <span>Run Live Demo</span>
          </button>
        </div>
      </div>

      {/* 8 DYNAMIC KPI CARDS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${kpi.bg}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-xl font-extrabold text-white font-mono mb-1">{kpi.value}</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">{kpi.subText}</div>
            </div>
          );
        })}
      </div>

      {/* VISUAL PACKET FLOW PIPELINE */}
      <PacketFlowVisualizer />

      {/* LIVE PACKET TABLE STREAM */}
      <PacketTable packets={livePackets} />

      {/* AI NETWORK ANALYSIS PANEL */}
      <AINetworkAnalysisPanel currentMetrics={currentMetrics} activeSession={activeSession} />
    </div>
  );
}
