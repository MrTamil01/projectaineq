import React from "react";
import { Shield, Github, Globe, ExternalLink } from "lucide-react";

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-[#0a0d14] border-t border-slate-800/80 py-6 px-6 text-xs text-slate-400 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-slate-200">NetMorph</span>
          <span>— 5G-Native Secure Traffic Intelligence & Morphing Platform</span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[11px]">
          <button onClick={() => setActivePage("landing")} className="hover:text-cyan-400">Overview</button>
          <button onClick={() => setActivePage("architecture")} className="hover:text-cyan-400">Architecture</button>
          <button onClick={() => setActivePage("api-docs")} className="hover:text-cyan-400">API Docs</button>
          <button onClick={() => setActivePage("demo-mode")} className="hover:text-cyan-400">Live Demo</button>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          Controlled Demo Simulation Environment • © 2026 NetMorph Labs
        </div>
      </div>
    </footer>
  );
}
