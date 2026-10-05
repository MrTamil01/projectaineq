import React from "react";
import { Activity, Radio, HardDrive, Lock, Shield, ArrowUpRight, Zap, RefreshCw } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";
import PacketFlowVisualizer from "../components/PacketFlowVisualizer";
import PacketTable from "../components/PacketTable";

export default function LiveMonitorPage() {
  const { activeSession, currentMetrics, livePackets } = useSimulation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>Live Traffic Telemetry Monitor</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              WEBSOCKET ACTIVE
            </span>
          </h2>
          <p className="text-xs text-slate-400">Continuous sub-second packet stream telemetrics over 5G transport slice</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
          <span>SOCKET STREAMING</span>
        </div>
      </div>

      {/* 6 STREAM METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 font-mono">
        {[
          { label: "Packets / Sec", val: `${currentMetrics.packetsPerSec} pkt/s`, color: "text-cyan-400" },
          { label: "Throughput", val: `${currentMetrics.throughputMbps} Mbps`, color: "text-blue-400" },
          { label: "Latency", val: `${currentMetrics.latency} ms`, color: "text-amber-400" },
          { label: "Jitter", val: `${currentMetrics.jitterMs} ms`, color: "text-purple-400" },
          { label: "Packet Overhead", val: `+${currentMetrics.overheadPercent}%`, color: "text-indigo-400" },
          { label: "Security Score", val: `${currentMetrics.securityScore}/100`, color: "text-emerald-400" }
        ].map((m, i) => (
          <div key={i} className="bg-[#121824] border border-slate-800 p-3 rounded-lg text-center">
            <div className="text-[10px] text-slate-400 mb-1">{m.label}</div>
            <div className={`text-base font-bold ${m.color}`}>{m.val}</div>
          </div>
        ))}
      </div>

      {/* PACKET FLOW GRAPH PIPELINE */}
      <PacketFlowVisualizer />

      {/* LIVE TRAFFIC TABLE */}
      <PacketTable packets={livePackets} />
    </div>
  );
}
