import React, { useState } from "react";
import { BarChart3, Clock, TrendingUp, ShieldCheck, Zap, Layers, Activity, Award } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useSimulation } from "../context/SimulationContext";

export default function AnalyticsPage() {
  const { metricsHistory, currentMetrics } = useSimulation();
  const [timeFilter, setTimeFilter] = useState("5m");

  const pieData = [
    { name: "HTTPS-LIKE", value: 40, color: "#00f0ff" },
    { name: "DNS-LIKE", value: 25, color: "#06b6d4" },
    { name: "VIDEO-STREAM-LIKE", value: 20, color: "#8b5cf6" },
    { name: "GAMING-LIKE", value: 15, color: "#10b981" }
  ];

  const beforeAfterMetrics = [
    { metric: "Latency", before: "12 ms", after: `${currentMetrics.latency} ms`, change: `+${currentMetrics.latency - 12}ms (5G Edge Shaper)` },
    { metric: "Throughput", before: "800 Mbps", after: `${currentMetrics.throughputMbps} Mbps`, change: "92.7% Retention" },
    { metric: "Average Packet Size", before: "1024 Bytes", after: "1077 Bytes", change: "+5.2% Padded Framing" },
    { metric: "Protocol Overhead", before: "0.0%", after: `+${currentMetrics.overheadPercent}%`, change: "Controlled Entropic Padding" },
    { metric: "Shaping Delay", before: "0.0 ms", after: "1.2 ms", change: "Sub-2ms Edge Pipeline" },
    { metric: "Fingerprint Visibility", before: "100% (Raw Signature)", after: "6% (Homogenous TLS Stream)", change: "94% Signature Suppression" }
  ];

  // Calculated performance score
  const perfScore = Math.floor(
    Math.min(99, Math.max(70, 100 - (currentMetrics.latency * 0.3) - (currentMetrics.overheadPercent * 1.5) + (currentMetrics.securityScore * 0.15)))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Performance & Security Analytics</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              5G TELEMETRY
            </span>
          </h2>
          <p className="text-xs text-slate-400">Quantitative metrics analysis comparing unshaped traffic vs morphed 5G protocol signatures</p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
          {["1m", "5m", "30m", "Current Session"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`px-3 py-1 rounded transition ${
                timeFilter === tf ? "bg-cyan-500 text-black font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* PERFORMANCE SCORE CARD & SUMMARY BANNER */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 rounded-xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0">
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs text-cyan-400 font-mono font-semibold uppercase">NETMORPH OVERALL PERFORMANCE SCORE</div>
            <div className="text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
              <span>{perfScore}</span>
              <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Weighted formula: Latency ({currentMetrics.latency}ms) + Overhead ({currentMetrics.overheadPercent}%) + Security ({currentMetrics.securityScore}%)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6">
          <div>
            <div className="text-slate-400 text-[10px]">AVG LATENCY</div>
            <div className="text-amber-400 font-bold">{currentMetrics.latency} ms</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">THROUGHPUT</div>
            <div className="text-blue-400 font-bold">{currentMetrics.throughputMbps} Mbps</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">FINGERPRINT VISIBILITY</div>
            <div className="text-emerald-400 font-bold">6% (Suppressed)</div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID 1: Latency & Throughput over time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Latency Chart */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-white uppercase font-mono flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Latency Timeline (ms)</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Simulated vs Baseline</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 40]} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="latency" name="Morphed Latency (ms)" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                <Line type="monotone" dataKey="latencyBefore" name="Raw Latency (ms)" stroke="#00f0ff" strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-white uppercase font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Throughput over Time (Mbps)</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">5G Slice Allocation</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 1000]} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="throughputMbps" name="Throughput (Mbps)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS GRID 2: Overhead & Profile Usage Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overhead Bar Chart */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-white uppercase font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Traffic Overhead Percentage (%)</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Padded Entropic Overhead</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 15]} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="overheadPercent" name="Overhead (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Distribution Pie Chart */}
        <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-white uppercase font-mono flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Morphing Profile Usage Distribution</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Demo Sessions Share</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-slate-300">
            {pieData.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></div>
                <span>{p.name}: {p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARISON TABLE: BEFORE MORPHING VS AFTER MORPHING */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Before Morphing vs After Morphing Detailed Metrics</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Performance Metric</th>
                <th className="py-2.5 px-4 text-slate-400">Before Morphing (Raw)</th>
                <th className="py-2.5 px-4 text-cyan-400 font-bold">After Morphing (NetMorph)</th>
                <th className="py-2.5 px-4 text-slate-400">Performance Impact & Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {beforeAfterMetrics.map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{row.metric}</td>
                  <td className="py-3 px-4 text-slate-400">{row.before}</td>
                  <td className="py-3 px-4 text-cyan-400 font-bold">{row.after}</td>
                  <td className="py-3 px-4 text-emerald-300">{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
