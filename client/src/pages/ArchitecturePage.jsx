import React, { useState } from "react";
import { Network, Cpu, Lock, Shield, Radio, Server, Database, Code2, Layers, CheckCircle2, ArrowDown, X } from "lucide-react";

export default function ArchitecturePage() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const topologyNodes = [
    {
      id: "client",
      title: "1. Client Application",
      sub: "Browser / Mobile UE / Enterprise App",
      desc: "Generates raw unencrypted or standard TLS application payload data (Web, Video HLS, Gaming UDP, API REST).",
      details: "Acts as the origin endpoint. Communicates via local IPC or virtual network adapter to the NetMorph Client Daemon.",
      icon: Cpu
    },
    {
      id: "netmorph-client",
      title: "2. NetMorph Client Shaper",
      sub: "Local Daemon & Packet Hook",
      desc: "Captures outbound IP packets and routes them into the local cryptographic envelope buffer.",
      details: "Performs initial protocol framing classification and assigns a session UUID before passing to authentication.",
      icon: Shield
    },
    {
      id: "auth",
      title: "3. Authentication Service",
      sub: "JWT & Ephemeral Key Negotiator",
      desc: "Verifies user identity, role permissions (USER, ENTERPRISE, PROVIDER), and initializes session security tokens.",
      details: "Uses bcrypt hashed credentials & signed JWTs to authorize gNodeB 5G slice allocation.",
      icon: Lock
    },
    {
      id: "encryption",
      title: "4. Encryption Envelope Layer",
      sub: "AES-256-GCM Cryptographic Shaper",
      desc: "Encapsulates payload into an AES-256-GCM ciphertext container with dynamic key rotation.",
      details: "Ensures complete confidentiality. The raw payload is unreadable even if 5G radio frames are intercepted.",
      icon: Lock
    },
    {
      id: "morph-engine",
      title: "5. Traffic Morphing Engine",
      sub: "Entropic Pattern Transformation",
      desc: "Pads packet size, alters inter-packet arrival times, and wraps headers to match target profile signature.",
      details: "Supported Profiles: HTTPS-LIKE (1420B MTU), DNS-LIKE (512B bursts), VIDEO-STREAM-LIKE (MPEG-DASH), GAMING-LIKE (60Hz UDP). Target entropy >7.8.",
      icon: Network
    },
    {
      id: "5g-optimization",
      title: "6. 5G QoS Optimization Layer",
      sub: "URLLC / eMBB Slice Allocation",
      desc: "Maps morphed traffic onto dedicated 5G Network Slices with guaranteed bandwidth & ultra-low latency.",
      details: "Interfaces with 5G Core (5GC) UPF (User Plane Function) for QoS Flow binding and priority scheduling.",
      icon: Radio
    },
    {
      id: "destination",
      title: "7. Protected Destination Service",
      sub: "Enterprise Server / Internet Endpoint",
      desc: "Receives morphed 5G transport frames, strips morph padding envelope, and delivers payload cleanly.",
      details: "Completes the secure low-latency communication pipeline with verified zero data loss.",
      icon: Server
    }
  ];

  const backendNodes = [
    { name: "React Frontend (Vite)", role: "Modern cybersecurity SaaS UI with sub-second WebSocket updates", color: "text-cyan-400" },
    { name: "Express.js REST API", role: "Handles HTTP endpoints, rate limiting, CORS, & Helmet security", color: "text-blue-400" },
    { name: "Auth & JWT Middleware", role: "Role-Based Access Control (RBAC) & session validation", color: "text-indigo-400" },
    { name: "TrafficMorphingEngine", role: "Core simulation engine managing packet generation & entropic shaper", color: "text-purple-400" },
    { name: "Analytics & Socket.IO Engine", role: "Real-time metrics aggregator emitting sub-second socket streams", color: "text-emerald-400" },
    { name: "MongoDB / In-Memory Repository", role: "Dual-mode persistence storage with zero-config fallback", color: "text-amber-400" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>Interactive Platform Architecture Topology</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              TOPOLOGY
            </span>
          </h2>
          <p className="text-xs text-slate-400">Component data-flow model: Client → Morphing Engine → 5G Transport → Destination</p>
        </div>
      </div>

      {/* INTERACTIVE TOPOLOGY PIPELINE */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider text-center mb-6">
          End-to-End Data Pipeline Architecture (Click component to view details)
        </h3>

        <div className="max-w-2xl mx-auto space-y-3">
          {topologyNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedComponent(node)}
                  className="w-full p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{node.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{node.sub}</div>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono font-semibold group-hover:underline">Inspect →</span>
                </button>

                {idx < topologyNodes.length - 1 && (
                  <div className="my-1 text-cyan-500/50">
                    <ArrowDown className="w-5 h-5 animate-bounce" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BACKEND ARCHITECTURE STACK */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Full-Stack Software Architecture Layering</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {backendNodes.map((b, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className={`font-bold ${b.color}`}>{b.name}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">{b.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPONENT DETAIL MODAL */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedComponent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Network className="w-5 h-5 text-cyan-400" />
              <span>{selectedComponent.title}</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <strong className="text-cyan-400 block mb-1">Primary Role:</strong>
                {selectedComponent.desc}
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <strong className="text-emerald-400 block mb-1">Technical Implementation:</strong>
                {selectedComponent.details}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
