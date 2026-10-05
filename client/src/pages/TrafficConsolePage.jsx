import React, { useState } from "react";
import { Sliders, Play, Square, Pause, RotateCcw, Shield, Laptop, CheckCircle2, ArrowRight } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";
import PacketFlowVisualizer from "../components/PacketFlowVisualizer";
import PacketTable from "../components/PacketTable";

export default function TrafficConsolePage() {
  const { activeSession, startSession, stopSession, livePackets } = useSimulation();

  const [formConfig, setFormConfig] = useState({
    source: "Browser",
    trafficType: "Video",
    morphProfile: "video-stream-like",
    encryption: "AES-256 simulation",
    performanceMode: "Balanced"
  });

  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await startSession(formConfig);
    setIsPaused(false);
    setLoading(false);
  };

  const handleStop = async () => {
    setLoading(true);
    await stopSession();
    setIsPaused(false);
    setLoading(false);
  };

  const handleReset = () => {
    setFormConfig({
      source: "Browser",
      trafficType: "Video",
      morphProfile: "video-stream-like",
      encryption: "AES-256 simulation",
      performanceMode: "Balanced"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>Traffic Morphing Console</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              PRIMARY DEMO ENGINE
            </span>
          </h2>
          <p className="text-xs text-slate-400">Configure controlled traffic transformation parameters and generate live morphed 5G packet streams</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {!activeSession ? (
            <button
              onClick={handleStart}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>START MORPHING</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition flex items-center gap-1.5 ${
                  isPaused
                    ? "bg-amber-950/60 border-amber-500 text-amber-300"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Pause className="w-4 h-4" />
                <span>{isPaused ? "RESUME" : "PAUSE"}</span>
              </button>

              <button
                onClick={handleStop}
                disabled={loading}
                className="px-4 py-2.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs transition flex items-center gap-1.5"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>STOP SESSION</span>
              </button>
            </>
          )}

          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs transition"
            title="Reset Form Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTROL PANEL FORM GRID */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Laptop className="w-4 h-4 text-cyan-400" />
          <span>Session Parameters Configuration</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Input Source */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">1. Client Source</label>
            <select
              value={formConfig.source}
              onChange={(e) => setFormConfig({ ...formConfig, source: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
            >
              <option value="Browser">Browser Client (Web App)</option>
              <option value="Enterprise App">Enterprise App (API Endpoint)</option>
              <option value="Mobile Client">Mobile Client (5G UE)</option>
            </select>
            <p className="text-[10px] text-slate-500 font-mono">Originating endpoint generating raw payload</p>
          </div>

          {/* Traffic Type */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">2. Raw Traffic Type</label>
            <select
              value={formConfig.trafficType}
              onChange={(e) => setFormConfig({ ...formConfig, trafficType: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
            >
              <option value="Web">Web Traffic (HTTP/HTML)</option>
              <option value="API">API Requests (JSON REST)</option>
              <option value="File Transfer">File Transfer (FTP/Sync)</option>
              <option value="Video">Video Streaming (HLS/Dash)</option>
              <option value="Gaming">Gaming Traffic (UDP)</option>
              <option value="DNS Query">DNS Query (Port 53)</option>
            </select>
            <p className="text-[10px] text-slate-500 font-mono">Original unshaped application payload signature</p>
          </div>

          {/* Morphing Profile */}
          <div className="space-y-2">
            <label className="block text-cyan-400 font-bold">3. Target Morphing Profile</label>
            <select
              value={formConfig.morphProfile}
              onChange={(e) => setFormConfig({ ...formConfig, morphProfile: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 font-mono font-bold outline-none"
            >
              <option value="https-like">HTTPS-LIKE (Standard TLS 1.3 framing)</option>
              <option value="dns-like">DNS-LIKE (DNS over HTTPS query chunks)</option>
              <option value="video-stream-like">VIDEO-STREAM-LIKE (HLS burst segments)</option>
              <option value="gaming-like">GAMING-LIKE (High tick-rate 60Hz UDP)</option>
            </select>
            <p className="text-[10px] text-slate-400 font-mono">Target protocol pattern presenting to 5G network inspection</p>
          </div>

          {/* Encryption Mode */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">4. Encryption Protocol</label>
            <select
              value={formConfig.encryption}
              onChange={(e) => setFormConfig({ ...formConfig, encryption: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
            >
              <option value="AES-256 simulation">AES-256-GCM Envelope Encryption</option>
              <option value="TLS simulation">TLS 1.3 Outer Envelope Wrapping</option>
            </select>
            <p className="text-[10px] text-slate-500 font-mono">Cryptographic MAC tag encapsulation</p>
          </div>

          {/* Performance Mode */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-medium">5. 5G Performance Mode</label>
            <select
              value={formConfig.performanceMode}
              onChange={(e) => setFormConfig({ ...formConfig, performanceMode: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
            >
              <option value="Low Latency">Low Latency Priority (URLLC Slice)</option>
              <option value="Balanced">Balanced (Standard 5G Slice)</option>
              <option value="High Throughput">High Throughput Priority (eMBB Slice)</option>
            </select>
            <p className="text-[10px] text-slate-500 font-mono">QoS scheduling optimization profile</p>
          </div>
        </div>
      </div>

      {/* VISUAL PIPELINE FLOW */}
      <PacketFlowVisualizer />

      {/* PACKETS STREAM TABLE */}
      <PacketTable packets={livePackets} />
    </div>
  );
}
