import React, { useState } from "react";
import { Settings, Shield, Sliders, Bell, HardDrive, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState("CyberDark");
  const [autoRotateKeys, setAutoRotateKeys] = useState(true);
  const [telemetryInterval, setTelemetryInterval] = useState("1500");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <span>System & Preferences Settings</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
            CONFIG
          </span>
        </h2>
        <p className="text-xs text-slate-400">Configure NetMorph local simulation defaults, telemetry interval, and security key parameters</p>
      </div>

      {/* SETTINGS FORM */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl max-w-3xl space-y-6">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs font-mono">
          {/* User Account Info */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Operator Account Information</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Operator Name</label>
                <input
                  type="text"
                  disabled
                  value={user?.name || "Demo Operator"}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Email</label>
                <input
                  type="text"
                  disabled
                  value={user?.email || "demo@netmorph.io"}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Telemetry & Socket Controls */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Telemetry & Stream Rate</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 mb-1">Packet Stream Tick Rate</label>
                <select
                  value={telemetryInterval}
                  onChange={(e) => setTelemetryInterval(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white outline-none"
                >
                  <option value="1000">1,000 ms (Fast Stream)</option>
                  <option value="1500">1,500 ms (Standard)</option>
                  <option value="3000">3,000 ms (Low Overhead)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">UI Theme Preset</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white outline-none"
                >
                  <option value="CyberDark">5G Cyber Dark (Default)</option>
                  <option value="MidnightBlue">Midnight Blue Enterprise</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Automation */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Security Automation Controls</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded bg-slate-900 border border-slate-800">
              <div>
                <div className="font-bold text-white">Auto Key Rotation</div>
                <div className="text-[10px] text-slate-500">Rotate ephemeral session keys every 15 minutes automatically</div>
              </div>
              <input
                type="checkbox"
                checked={autoRotateKeys}
                onChange={(e) => setAutoRotateKeys(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            Save Configuration Changes
          </button>
        </form>
      </div>
    </div>
  );
}
