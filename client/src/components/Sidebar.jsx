import React from "react";
import {
  LayoutDashboard,
  Sliders,
  Activity,
  BarChart3,
  ShieldCheck,
  Layers,
  Clock,
  Zap,
  Building2,
  Building,
  PlaySquare,
  Network,
  Code2,
  Settings,
  Globe
} from "lucide-react";

export default function Sidebar({ activePage, setActivePage }) {
  const navigationItems = [
    { id: "landing", label: "Overview Landing", icon: Globe, badge: "Public" },
    { id: "dashboard", label: "Main Dashboard", icon: LayoutDashboard },
    { id: "traffic-morphing", label: "Traffic Morphing", icon: Sliders, highlight: true },
    { id: "live-monitor", label: "Live Telemetry", icon: Activity },
    { id: "analytics", label: "Privacy Analytics", icon: BarChart3 },
    { id: "security", label: "Security Analytics", icon: ShieldCheck },
    { id: "protocol-profiles", label: "Protocol Profiles", icon: Layers },
    { id: "sessions", label: "Session Management", icon: Clock },
    { id: "5g-simulator", label: "5G Simulator", icon: Zap, badge: "Interactive" },
    { id: "provider", label: "Provider Dashboard", icon: Building2, badge: "Telco" },
    { id: "enterprise", label: "Enterprise Center", icon: Building },
    { id: "demo-mode", label: "Presentation Demo", icon: PlaySquare, badge: "Guided" },
    { id: "architecture", label: "Architecture Topology", icon: Network },
    { id: "api-docs", label: "API Documentation", icon: Code2 },
    { id: "settings", label: "System Settings", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0a0d14] border-r border-slate-800/80 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 overflow-y-auto">
      <div className="p-3 text-[10px] font-mono text-slate-400 tracking-wider uppercase border-b border-slate-800/60 flex items-center justify-between">
        <span>PLATFORM NAVIGATION</span>
        <span className="text-cyan-400 font-bold">v1.0-5G</span>
      </div>

      <nav className="p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? "bg-gradient-to-r from-cyan-950/80 to-slate-900 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/50"
                  : item.highlight
                  ? "text-cyan-400 bg-slate-900/40 hover:bg-slate-800/80 border border-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                    item.badge === "Telco"
                      ? "bg-purple-950 text-purple-300 border border-purple-800/40"
                      : item.badge === "Guided"
                      ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                      : "bg-slate-800 text-slate-300 border border-slate-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info Box */}
      <div className="mt-auto p-3 m-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between font-mono text-[10px] text-slate-300">
          <span>5G SLICE #9921</span>
          <span className="text-emerald-400">ACTIVE</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          AES-256 Envelope Encrypted • Homogenous Fingerprint Shaper
        </p>
      </div>
    </aside>
  );
}
