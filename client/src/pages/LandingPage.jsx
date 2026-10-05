import React from "react";
import {
  Shield,
  Zap,
  Lock,
  Activity,
  CheckCircle2,
  XCircle,
  Play,
  ArrowRight,
  Radio,
  Server,
  Layers,
  BarChart,
  EyeOff,
  Cpu
} from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export default function LandingPage({ setActivePage }) {
  const { runPresentationDemo } = useSimulation();

  return (
    <div className="space-y-16 py-4 px-4 max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <section className="relative text-center pt-8 pb-12 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-6 shadow-lg shadow-cyan-950/50">
          <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span>NEXT-GEN 5G TRAFFIC MORPHING ENGINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
          NET<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">MORPH</span>
        </h1>

        <p className="text-xl sm:text-2xl font-semibold text-slate-200 mb-2">
          5G-Native Secure Traffic Intelligence & Morphing
        </p>

        <p className="text-base font-mono text-cyan-400 mb-6 tracking-wide">
          "Secure. Adaptive. Low-Latency."
        </p>

        <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
          NetMorph provides controlled, high-performance traffic-pattern transformation for privacy-focused communication over 5G network slices—reducing traffic fingerprint visibility without compromising latency.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActivePage("dashboard")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActivePage("demo-mode");
              runPresentationDemo();
            }}
            className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-semibold text-sm transition-all flex items-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current text-cyan-400" />
            <span>Run Live Demo</span>
          </button>

          <button
            onClick={() => setActivePage("architecture")}
            className="px-6 py-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Explore Architecture</span>
          </button>
        </div>
      </section>

      {/* PIPELINE TOPOLOGY VISUAL */}
      <section className="bg-[#121824] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
            5G End-to-End Traffic Morphing Pipeline
          </h3>
          <p className="text-xs text-slate-400">Encrypted application payload metadata is continuously shaped into protocol-like signatures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative py-4">
          {[
            { title: "User Device", label: "Encrypted App Stream", icon: Cpu, color: "text-blue-400" },
            { title: "NetMorph Engine", label: "Homogenous Pattern Shaper", icon: Shield, color: "text-cyan-400", active: true },
            { title: "5G Transport Slice", label: "gNodeB Low-Latency QoS", icon: Radio, color: "text-indigo-400" },
            { title: "Internet Service", label: "Protected Destination", icon: Server, color: "text-emerald-400" }
          ].map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={i} className={`p-4 rounded-xl border text-center relative ${
                node.active
                  ? "bg-cyan-950/40 border-cyan-500/40 shadow-lg shadow-cyan-950/50"
                  : "bg-slate-900/80 border-slate-800"
              }`}>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 mx-auto mb-3 flex items-center justify-center">
                  <Icon className={`w-6 h-6 ${node.color}`} />
                </div>
                <div className="text-xs font-bold text-white mb-1">{node.title}</div>
                <div className="text-[11px] text-slate-400 font-mono">{node.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Platform Core Capabilities</h2>
          <p className="text-xs text-slate-400">Built for 5G telecommunication slice environments and enterprise security ops</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Traffic Pattern Morphing",
              desc: "Transforms encrypted metadata signatures into DNS-like, Video-stream-like, Gaming-like, or HTTPS-like patterns.",
              icon: EyeOff,
              color: "text-cyan-400"
            },
            {
              title: "End-to-End Encryption",
              desc: "AES-256-GCM context initialization with dynamic ephemeral session key rotation for complete data confidentiality.",
              icon: Lock,
              color: "text-emerald-400"
            },
            {
              title: "5G QoS Optimization",
              desc: "Integrates with 5G Network Slicing (URLLC/eMBB) to guarantee ultra-low latency & high throughput.",
              icon: Zap,
              color: "text-indigo-400"
            },
            {
              title: "Real-Time Telemetry",
              desc: "Sub-second WebSocket updates for latency, throughput, jitter, entropy, overhead, and packet loss metrics.",
              icon: Activity,
              color: "text-purple-400"
            },
            {
              title: "Security Threat Monitoring",
              desc: "Automated anomaly detection, entropy threshold auditing (>7.8), and key rotation event logging.",
              icon: Shield,
              color: "text-rose-400"
            },
            {
              title: "Telecom Monetization",
              desc: "Enables 5G mobile operators to offer premium traffic privacy slices to enterprise subscribers.",
              icon: BarChart,
              color: "text-amber-400"
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="bg-[#121824] border border-slate-800 hover:border-slate-700 rounded-xl p-5 transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 mb-4 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{card.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY NETMORPH? COMPARISON TABLE */}
      <section className="bg-[#121824] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Why NetMorph over Traditional VPNs?</h3>
          <p className="text-xs text-slate-400">Architectural breakdown: Traditional VPN vs NetMorph 5G Traffic Morphing</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Metric / Architectural Aspect</th>
                <th className="py-3 px-4 text-slate-400">Traditional VPN</th>
                <th className="py-3 px-4 text-cyan-400 font-bold">NetMorph 5G Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { metric: "Centralized Relay Dependency", vpn: "Single IP funnel / Easy to block", netmorph: "Native 5G Slice Transport (Distributed)" },
                { metric: "Traffic Fingerprint Visibility", vpn: "High (OpenVPN/WireGuard headers visible)", netmorph: "Low (Padded Homogenous Signature)" },
                { metric: "Latency Overhead", vpn: "High (+40ms to +150ms tunnel hop)", netmorph: "Low (+4ms to +18ms 5G Edge Shaping)" },
                { metric: "Real-Time Telemetry", vpn: "Minimal / Black-box tunnel", netmorph: "Comprehensive Sub-Second Dashboard" },
                { metric: "5G QoS Slicing Integration", vpn: "None (Standard Best-Effort IP)", netmorph: "Native URLLC & eMBB Slice Aware" },
                { metric: "Telecom Provider Monetization", vpn: "Third-party subscription loss", netmorph: "Native Telco Premium Service Tier" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-200">{row.metric}</td>
                  <td className="py-3 px-4 text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{row.vpn}</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{row.netmorph}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* QUICK CTA */}
      <section className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-white">Ready to Explore NetMorph in Action?</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Experience full-stack traffic morphing simulation, 5G latency tuning, security threat monitoring, and provider monetization dashboards live.
        </p>
        <button
          onClick={() => setActivePage("dashboard")}
          className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/25 transition-all"
        >
          Enter Main Dashboard
        </button>
      </section>
    </div>
  );
}
