import React from "react";
import { Laptop, Lock, Shield, Radio, Server, ArrowRight, CheckCircle2 } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export default function PacketFlowVisualizer() {
  const { activeSession, currentMetrics, livePackets } = useSimulation();
  const latestPacket = livePackets[0] || null;

  const steps = [
    { id: "source", title: "User Device", desc: activeSession ? activeSession.source : "Browser Client", icon: Laptop, color: "text-blue-400" },
    { id: "encrypt", title: "Encryption Layer", desc: "AES-256 / TLS Envelope", icon: Lock, color: "text-cyan-400" },
    { id: "morph", title: "Morphing Engine", desc: activeSession ? activeSession.morphProfile.toUpperCase() : "HTTPS-LIKE", icon: Shield, color: "text-indigo-400" },
    { id: "transport", title: "5G Transport", desc: "gNodeB Slice Allocation", icon: Radio, color: "text-purple-400" },
    { id: "destination", title: "Destination", desc: "Protected Enterprise Endpoint", icon: Server, color: "text-emerald-400" }
  ];

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <span>Visual Traffic Morphing Pipeline</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              REAL-TIME SIMULATION
            </span>
          </h3>
          <p className="text-xs text-slate-400">Live trajectory of encrypted payload metadata transformation over 5G transport</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Packet Rate:</span>
          <span className="text-cyan-400 font-bold">{currentMetrics.packetsPerSec} pkt/s</span>
        </div>
      </div>

      {/* Nodes Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative py-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isMorphedStep = step.id === "morph";

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              {/* Node Card */}
              <div
                className={`w-full p-3.5 rounded-lg border text-center transition-all ${
                  isMorphedStep
                    ? "bg-gradient-to-b from-cyan-950/60 to-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/50"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800/90 border border-slate-700 mx-auto mb-2 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${step.color} ${activeSession ? "animate-pulse" : ""}`} />
                </div>
                <div className="text-xs font-bold text-white mb-0.5">{step.title}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{step.desc}</div>
              </div>

              {/* Arrow Connector (for desktop view) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-cyan-500/60 animate-pulse">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Active Packet Snapshot Bar */}
      {latestPacket && (
        <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Latest Packet:</span>
            <span className="text-white font-bold">{latestPacket.packetId}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">Raw: <strong className="text-slate-200">{latestPacket.originalSize}B</strong></span>
            <span className="text-slate-400">Transformed: <strong className="text-cyan-400">{latestPacket.transformedSize}B</strong></span>
            <span className="text-slate-400">Overhead: <strong className="text-amber-400">+{latestPacket.overheadPercent}%</strong></span>
            <span className="text-slate-400">Entropy: <strong className="text-emerald-400">{latestPacket.entropy || 7.95}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}
