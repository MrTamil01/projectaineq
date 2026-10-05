import React from "react";
import { AlertTriangle, Play, ShieldAlert } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export default function DemoBanner() {
  const { runPresentationDemo, isDemoRunning } = useSimulation();

  return (
    <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border-b border-cyan-500/20 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-cyan-300">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="font-semibold text-white tracking-wide uppercase">Controlled Prototype & Simulation Environment:</span>
        <span className="text-slate-300 hidden md:inline">
          NetMorph transforms encrypted traffic metadata into protocol-like signatures for research & privacy demonstration.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={runPresentationDemo}
          disabled={isDemoRunning}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
            isDemoRunning
              ? "bg-cyan-500/20 text-cyan-400 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold shadow-lg shadow-cyan-500/20"
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isDemoRunning ? "Demo Sequence Running..." : "Run Presentation Demo"}
        </button>
      </div>
    </div>
  );
}
