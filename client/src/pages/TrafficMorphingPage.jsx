import React, { useMemo, useState } from "react";
import { SlidersHorizontal, Play, Square, Activity, Shield, Gauge, ArrowRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSimulation } from "../context/SimulationContext";

export default function TrafficMorphingPage() {
  const { activeSession, startSession, stopSession, livePackets, metricsHistory, currentMetrics, networkConditions } = useSimulation();

  const [form, setForm] = useState({
    sourceProfile: "HTTPS_LIKE",
    targetProfile: "VIDEO_LIKE",
    packetCount: 1000,
    packetSize: 1200,
    bandwidth: networkConditions.bandwidthMbps,
    latency: networkConditions.latencyMs,
    durationSeconds: 30
  });

  const [loading, setLoading] = useState(false);

  const chartData = useMemo(() => {
    if (!metricsHistory.length) {
      return [
        { name: "Before", size: 980, burst: 72, latency: 15 },
        { name: "After", size: 1340, burst: 58, latency: 18 },
      ];
    }

    return metricsHistory.slice(-6).map((entry, index) => ({
      name: `T${index + 1}`,
      size: Math.round((entry.throughputMbps || 700) / 2),
      burst: entry.packetsPerSec ? Math.round(entry.packetsPerSec / 16) : 62,
      latency: entry.latency || 18
    }));
  }, [metricsHistory]);

  const handleStart = async () => {
    setLoading(true);
    try {
      await startSession({
        source: "Browser",
        trafficType: form.sourceProfile.toLowerCase().replace("_like", ""),
        morphProfile: form.targetProfile.toLowerCase().replace("_like", "-like"),
        sourceProfile: form.sourceProfile,
        targetProfile: form.targetProfile,
        packetCount: Number(form.packetCount),
        packetSize: Number(form.packetSize),
        bandwidth: Number(form.bandwidth),
        latency: Number(form.latency),
        durationSeconds: Number(form.durationSeconds),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await stopSession();
    } finally {
      setLoading(false);
    }
  };

  const beforeAfter = [
    { label: "Fingerprint Visibility", before: "HIGH", after: "LOW", tint: "text-rose-300" },
    { label: "Packet Size Avg", before: "1024 B", after: `${Math.round((currentMetrics.throughputMbps || 700) / 6)} B`, tint: "text-cyan-300" },
    { label: "Burst Pattern", before: "Unstructured", after: "Targeted", tint: "text-emerald-300" },
    { label: "Privacy Improvement", before: "0%", after: `${Math.max(24, Math.min(96, Math.round(100 - currentMetrics.overheadPercent * 6)))}%`, tint: "text-amber-300" }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <span>Traffic Morphing</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              DEMO PROFILE ENGINE
            </span>
          </h2>
          <p className="text-xs text-slate-400">Simulated traffic shaper for application-layer morphing examples only.</p>
        </div>

        <div className="flex gap-2">
          {!activeSession ? (
            <button
              onClick={handleStart}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs"
            >
              <span className="flex items-center gap-2"><Play className="w-4 h-4 fill-current" /> START SIMULATION</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 font-bold text-xs"
            >
              <span className="flex items-center gap-2"><Square className="w-4 h-4 fill-current" /> STOP SESSION</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#121824] border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block text-slate-300 mb-2">Source Traffic</label>
              <select value={form.sourceProfile} onChange={(e) => setForm({ ...form, sourceProfile: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white">
                <option value="HTTPS_LIKE">HTTPS-LIKE</option>
                <option value="DNS_LIKE">DNS-LIKE</option>
                <option value="VIDEO_LIKE">VIDEO-LIKE</option>
                <option value="GAMING_LIKE">GAMING-LIKE</option>
              </select>
            </div>

            <div>
              <label className="block text-cyan-400 mb-2">Target Profile</label>
              <select value={form.targetProfile} onChange={(e) => setForm({ ...form, targetProfile: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-200">
                <option value="HTTPS_LIKE">HTTPS-LIKE</option>
                <option value="DNS_LIKE">DNS-LIKE</option>
                <option value="VIDEO_LIKE">VIDEO-LIKE</option>
                <option value="GAMING_LIKE">GAMING-LIKE</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Packet Count</label>
              <input type="number" min="64" step="64" value={form.packetCount} onChange={(e) => setForm({ ...form, packetCount: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Simulation Duration</label>
              <input type="number" min="5" max="120" value={form.durationSeconds} onChange={(e) => setForm({ ...form, durationSeconds: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800"><div className="text-slate-400">Bandwidth</div><div className="mt-2 text-cyan-400 text-lg">{form.bandwidth} Mbps</div></div>
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800"><div className="text-slate-400">Latency</div><div className="mt-2 text-amber-400 text-lg">{form.latency} ms</div></div>
            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800"><div className="text-slate-400">Mode</div><div className="mt-2 text-emerald-400 text-lg">Simulated</div></div>
          </div>
        </div>

        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-bold uppercase text-white font-mono flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Privacy Demo
          </h3>
          <div className="mt-5 space-y-4">
            {beforeAfter.map((row) => (
              <div key={row.label} className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <div className="text-[10px] text-slate-400 uppercase font-mono">{row.label}</div>
                <div className="mt-2 flex items-center justify-between text-[12px]">
                  <span className="text-slate-300">Before: {row.before}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                  <span className={`${row.tint}`}>After: {row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase text-white font-mono mb-4"><Gauge className="w-4 h-4 text-cyan-400" /> Packet Size Distribution</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px" }} />
                <Bar dataKey="size" fill="#22d3ee" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase text-white font-mono mb-4"><Activity className="w-4 h-4 text-emerald-400" /> Packet Frequency</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="burst" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
