import React, { useState } from "react";
import { Zap, Sliders, Radio, Activity, ShieldCheck, RefreshCw, BarChart } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export default function FiveGSimulatorPage() {
  const { networkConditions, updateConditions } = useSimulation();

  const [conds, setConds] = useState(networkConditions);

  const presets = [
    { name: "EXCELLENT", label: "5G mmWave Excellent", bandwidthMbps: 850, latencyMs: 12, jitterMs: 2, packetLossPercent: 0.1 },
    { name: "GOOD", label: "5G Sub-6GHz Good", bandwidthMbps: 450, latencyMs: 25, jitterMs: 5, packetLossPercent: 0.5 },
    { name: "AVERAGE", label: "5G Standard / LTE", bandwidthMbps: 120, latencyMs: 50, jitterMs: 12, packetLossPercent: 1.5 },
    { name: "POOR", label: "Degraded 5G Edge", bandwidthMbps: 25, latencyMs: 120, jitterMs: 35, packetLossPercent: 4.5 }
  ];

  const handleSliderChange = (field, val) => {
    const updated = { ...conds, [field]: parseFloat(val), preset: "CUSTOM" };
    setConds(updated);
    updateConditions(updated);
  };

  const applyPreset = (p) => {
    setConds(p);
    updateConditions(p);
  };

  // Dynamic metrics recalculation
  const calcThroughput = Math.floor(conds.bandwidthMbps * (1 - conds.packetLossPercent / 100));
  const calcPktRate = Math.floor(1000 + (conds.bandwidthMbps * 1.5));
  const perfScore = Math.floor(
    Math.min(99, Math.max(40, 100 - (conds.latencyMs * 0.3) - (conds.packetLossPercent * 5) - (conds.jitterMs * 0.5)))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>5G Performance & QoS Simulator</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 uppercase">
              QoS SLICE ENGINE
            </span>
          </h2>
          <p className="text-xs text-slate-400">Dynamically inject 5G network slice constraints (bandwidth, latency, jitter, packet loss) and observe NetMorph adaptation</p>
        </div>
      </div>

      {/* PRESETS SELECTOR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {presets.map((p) => {
          const isSelected = conds.preset === p.name;
          return (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-950/40 text-amber-200"
                  : "bg-[#121824] border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="text-xs font-bold font-mono mb-1">{p.label}</div>
              <div className="text-[11px] text-slate-400 font-mono">
                {p.bandwidthMbps} Mbps • {p.latencyMs}ms Latency
              </div>
            </button>
          );
        })}
      </div>

      {/* SLIDERS CONTROL PANEL */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Interactive 5G Physical Channel Sliders</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
          {/* Bandwidth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>5G Slice Bandwidth:</span>
              <span className="text-cyan-400 font-bold">{conds.bandwidthMbps} Mbps</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={conds.bandwidthMbps}
              onChange={(e) => handleSliderChange("bandwidthMbps", e.target.value)}
              className="w-full accent-cyan-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>10 Mbps</span>
              <span>1000 Mbps (1 Gbps)</span>
            </div>
          </div>

          {/* Latency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Channel Latency:</span>
              <span className="text-amber-400 font-bold">{conds.latencyMs} ms</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="1"
              value={conds.latencyMs}
              onChange={(e) => handleSliderChange("latencyMs", e.target.value)}
              className="w-full accent-amber-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5 ms (URLLC Slice)</span>
              <span>200 ms (Congested)</span>
            </div>
          </div>

          {/* Jitter Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Packet Jitter:</span>
              <span className="text-purple-400 font-bold">{conds.jitterMs} ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={conds.jitterMs}
              onChange={(e) => handleSliderChange("jitterMs", e.target.value)}
              className="w-full accent-purple-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 ms</span>
              <span>50 ms</span>
            </div>
          </div>

          {/* Packet Loss Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Simulated Packet Loss:</span>
              <span className="text-rose-400 font-bold">{conds.packetLossPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={conds.packetLossPercent}
              onChange={(e) => handleSliderChange("packetLossPercent", e.target.value)}
              className="w-full accent-rose-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0% (Pristine)</span>
              <span>10% (Lossy Edge)</span>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMICALLY RECALCULATED RESULTS */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Real-Time Recalculated NetMorph Performance Projection</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-500 mb-1">EFFECTIVE THROUGHPUT</div>
            <div className="text-xl font-bold text-cyan-400">{calcThroughput} Mbps</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-500 mb-1">TOTAL END-TO-END LATENCY</div>
            <div className="text-xl font-bold text-amber-400">{conds.latencyMs + 4} ms</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-500 mb-1">PACKET PROCESSING RATE</div>
            <div className="text-xl font-bold text-purple-400">{calcPktRate} pkt/s</div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-500 mb-1">NETMORPH QUALITY SCORE</div>
            <div className="text-xl font-bold text-emerald-400">{perfScore} / 100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
