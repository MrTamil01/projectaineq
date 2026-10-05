import React, { useState } from "react";
import { Shield, Radio, Bell, User, ChevronDown, Activity, Cpu, LogOut, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useSimulation } from "../context/SimulationContext";

export default function Navbar({ activePage, setActivePage }) {
  const { user, logout, loginAsDemo } = useAuth();
  const { activeSession, currentMetrics } = useSimulation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  return (
    <header className="h-16 bg-[#0c1019]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActivePage("landing")}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0d14] rounded-[7px] flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-wider text-white">NET<span className="text-cyan-400">MORPH</span></span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">5G-NATIVE</span>
            </div>
            <span className="text-[10px] text-slate-400 block -mt-1 font-mono">Secure Traffic Morphing Platform</span>
          </div>
        </button>

        {/* Connection Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-slate-300 font-medium">5G gNodeB:</span>
          <span className="text-emerald-400 font-mono font-semibold">CONNECTED</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono">{currentMetrics.latency}ms</span>
        </div>
      </div>

      {/* Middle: Active Session Status Bar */}
      {activeSession ? (
        <div className="hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs">
          <Activity className="w-4 h-4 text-cyan-400 animate-spin" />
          <div>
            <span className="text-cyan-200 font-medium">Active Morphing: </span>
            <span className="text-white font-mono font-semibold uppercase">{activeSession.morphProfile}</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-mono">{currentMetrics.throughputMbps} Mbps</span>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
          <Radio className="w-3.5 h-3.5 text-slate-500" />
          <span>System Ready — Idle Session</span>
        </div>
      )}

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Menu */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-mono"
            title="Switch Demo Role"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Role: <strong className="text-cyan-300">{user?.role || "USER"}</strong></span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 mt-2 w-48 bg-[#121824] border border-slate-700 rounded-lg shadow-xl py-1 z-50 text-xs">
              <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 border-b border-slate-800">
                SWITCH DEMO ROLE
              </div>
              {["USER", "ENTERPRISE", "PROVIDER", "ADMIN"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    loginAsDemo(r);
                    setShowRoleSwitcher(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 ${
                    user?.role === r ? "text-cyan-400 font-bold bg-cyan-950/30" : "text-slate-300"
                  }`}
                >
                  <span>{r} View</span>
                  {user?.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold text-xs">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <span className="text-xs text-slate-200 font-medium hidden sm:inline">{user?.name || "Operator"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121824] border border-slate-700 rounded-lg shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-slate-400 text-[11px] font-mono">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-500/30">
                  {user?.organization || "NetMorph Demo"}
                </span>
              </div>
              <button
                onClick={() => {
                  setActivePage("settings");
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                Account Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 border-t border-slate-800"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
