import React, { useEffect, useState } from "react";
import { PlaySquare, CheckCircle2, Activity, Shield, Terminal, ArrowRight, Award, RefreshCw, Zap } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";
import PacketFlowVisualizer from "../components/PacketFlowVisualizer";
import PacketTable from "../components/PacketTable";

export default function DemoModePage({ setActivePage }) {
  const { runPresentationDemo, isDemoRunning, demoStep, demoLogs, livePackets, currentMetrics } = useSimulation();
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const stepsList = [
    { num: 1, label: "CONNECT", desc: "5G Tunnel Handshake" },
    { num: 2, label: "ENCRYPT", desc: "AES-256 Context" },
    { num: 3, label: "MORPH", desc: "HLS Pattern Shaper" },
    { num: 4, label: "TRANSMIT", desc: "5G gNodeB Slice" },
    { num: 5, label: "ANALYZE", desc: "Entropy & QoS Telemetry" },
    { num: 6, label: "COMPLETE", desc: "Audit Report Certified" }
  ];

  useEffect(() => {
    if (demoStep === 6) {
      setShowSummaryModal(true);
    }
  }, [demoStep]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <PlaySquare className="w-5 h-5 text-emerald-400" />
            <span>Interactive Presentation Demo Mode</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase">
              AUTOMATED GUIDED DEMO
            </span>
          </h2>
          <p className="text-xs text-slate-400">One-click automated presentation sequence demonstrating complete end-to-end 5G traffic morphing flow</p>
        </div>

        <button
          onClick={runPresentationDemo}
          disabled={isDemoRunning}
          className={`px-6 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            isDemoRunning
              ? "bg-cyan-500/20 text-cyan-400 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-lg shadow-cyan-500/20"
          }`}
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>{isDemoRunning ? "Demo Sequence Executing..." : "RERUN GUIDED DEMO"}</span>
        </button>
      </div>

      {/* STEP PROGRESS INDICATOR BAR */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
          Presentation Sequence Progress (Step {demoStep > 0 ? demoStep : 0} of 6)
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {stepsList.map((st) => {
            const isCompleted = demoStep > st.num || demoStep === 6;
            const isCurrent = demoStep === st.num;

            return (
              <div
                key={st.num}
                className={`p-3 rounded-lg border text-center transition-all ${
                  isCompleted
                    ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                    : isCurrent
                    ? "bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950/50 animate-pulse"
                    : "bg-slate-900/60 border-slate-800 text-slate-500"
                }`}
              >
                <div className="text-[10px] font-mono font-bold mb-0.5">
                  {st.num}. {st.label}
                </div>
                <div className="text-[9px] font-mono truncate">{st.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DEMO TERMINAL LOG CONSOLE */}
      <div className="bg-[#0e131f] border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2 shadow-2xl">
        <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-800/80 pb-2">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            NETMORPH PRESENTATION AUTOMATION LOGS
          </span>
          <span>WEBSOCKET BROADCAST ACTIVE</span>
        </div>

        <div className="space-y-1 max-h-40 overflow-y-auto pt-1">
          {demoLogs.length > 0 ? (
            demoLogs.map((log, idx) => (
              <div key={idx} className="text-cyan-300/90 text-[11px] leading-relaxed">
                <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
              </div>
            ))
          ) : (
            <p className="text-slate-600 text-[11px] italic py-2">Click "RERUN GUIDED DEMO" above to initiate the step-by-step presentation sequence.</p>
          )}
        </div>
      </div>

      {/* VISUAL PIPELINE */}
      <PacketFlowVisualizer />

      {/* PACKETS STREAM TABLE */}
      <PacketTable packets={livePackets} />

      {/* FINAL SUMMARY REPORT MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-center relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white font-mono">Demo Sequence Completed Successfully!</h3>
              <p className="text-xs text-slate-400">NetMorph 5G Traffic Morphing Prototype Operational Summary</p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-left">
              <div>
                <div className="text-[10px] text-slate-500">PACKETS PROCESSED</div>
                <div className="text-cyan-400 font-bold">128 Packets</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">AVERAGE LATENCY</div>
                <div className="text-amber-400 font-bold">{currentMetrics.latency} ms</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">THROUGHPUT</div>
                <div className="text-blue-400 font-bold">{currentMetrics.throughputMbps} Mbps</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">OVERHEAD</div>
                <div className="text-indigo-400 font-bold">+{currentMetrics.overheadPercent}%</div>
              </div>
              <div className="col-span-2 pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-500">FINAL SECURITY SCORE</div>
                <div className="text-lg font-bold text-emerald-400">96 / 100 (Certified Secure)</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs hover:bg-slate-800"
              >
                Close Report
              </button>
              <button
                onClick={() => {
                  setShowSummaryModal(false);
                  setActivePage("analytics");
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                View Full Analytics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
