import React from "react";
import { Layers, Shield, Network, Video, Gamepad2, CheckCircle2, Zap } from "lucide-react";
import { PROTOCOL_PROFILES } from "../utils/constants";
import { useSimulation } from "../context/SimulationContext";

export default function ProtocolProfilesPage({ setActivePage }) {
  const { startSession, activeSession } = useSimulation();

  const handleActivate = async (profile) => {
    await startSession({
      source: "Browser",
      trafficType: profile.id === "video-stream-like" ? "Video" : profile.id === "gaming-like" ? "Gaming" : "Web",
      morphProfile: profile.id,
      encryption: "AES-256 simulation",
      performanceMode: "Balanced"
    });
    setActivePage("traffic-console");
  };

  const getIcon = (id) => {
    switch (id) {
      case "dns-like":
        return Network;
      case "video-stream-like":
        return Video;
      case "gaming-like":
        return Gamepad2;
      case "https-like":
      default:
        return Shield;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>Protocol Morphing Profiles Catalog</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
            PATTERNS
          </span>
        </h2>
        <p className="text-xs text-slate-400">Pre-configured entropic metadata transformation specifications for target 5G protocol signatures</p>
      </div>

      {/* PROFILES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROTOCOL_PROFILES.map((prof) => {
          const Icon = getIcon(prof.id);
          const isActive = activeSession && activeSession.morphProfile === prof.id;

          return (
            <div
              key={prof.id}
              className={`bg-[#121824] border rounded-xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all ${
                isActive ? "border-cyan-500/60 shadow-cyan-950/50 bg-gradient-to-b from-cyan-950/30 to-slate-900" : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{prof.name}</h3>
                      <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                        {prof.tag}
                      </span>
                    </div>
                  </div>

                  {isActive && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ACTIVE NOW
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{prof.description}</p>

                <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-lg text-center font-mono text-xs border border-slate-800 mb-4">
                  <div>
                    <div className="text-[10px] text-slate-500">AVG LATENCY</div>
                    <div className="text-amber-400 font-bold">{prof.avgLatencyMs} ms</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">OVERHEAD</div>
                    <div className="text-cyan-400 font-bold">+{prof.expectedOverheadPercent}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500">TARGET ENTROPY</div>
                    <div className="text-emerald-400 font-bold">{prof.targetEntropy}</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-slate-400 font-mono">
                    <strong className="text-slate-200">Packet Pattern:</strong> {prof.packetPattern}
                  </div>
                  <div className="text-slate-400 font-mono">
                    <strong className="text-slate-200">Recommended Use Case:</strong> {prof.recommendedUseCase}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleActivate(prof)}
                className={`w-full py-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-default"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isActive ? "PROFILE ACTIVATED" : "ACTIVATE PROFILE"}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
