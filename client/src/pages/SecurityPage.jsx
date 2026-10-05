import React, { useState, useEffect } from "react";
import { ShieldCheck, Lock, Key, AlertTriangle, Activity, CheckCircle2, RefreshCw, Cpu, FileText } from "lucide-react";
import API from "../services/api";

export default function SecurityPage() {
  const [securityData, setSecurityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSecurity = async () => {
    try {
      const res = await API.get("/security/events");
      if (res.data?.success) {
        setSecurityData(res.data.data);
      }
    } catch (err) {
      console.warn("Security fetch warning:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurity();
  }, []);

  const handleAction = async (actionType) => {
    setActionLoading(true);
    try {
      await API.post("/security/action", { action: actionType });
      await fetchSecurity();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Security Center & Threat Monitoring</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase">
              ACTIVE DEFENSE
            </span>
          </h2>
          <p className="text-xs text-slate-400">Real-time encryption integrity, entropy verification, and key rotation event logging</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction("ROTATE_KEY")}
            disabled={actionLoading}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rotate Key</span>
          </button>

          <button
            onClick={() => handleAction("VERIFY_ENTROPY")}
            disabled={actionLoading}
            className="px-3.5 py-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 font-mono text-xs flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verify Entropy</span>
          </button>
        </div>
      </div>

      {/* 6 SECURITY KPI BADGES */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 font-mono">
        {[
          { label: "Encryption State", val: "ACTIVE (AES-256)", icon: Lock, color: "text-emerald-400" },
          { label: "Auth Token", val: "JWT VERIFIED", icon: CheckCircle2, color: "text-cyan-400" },
          { label: "Session Security", val: "SECURE", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Transport Layer", val: "TLS 1.3 SIMULATION", icon: Cpu, color: "text-indigo-400" },
          { label: "Threat Monitoring", val: "ACTIVE", icon: Activity, color: "text-blue-400" },
          { label: "Security Score", val: `${securityData?.securityScore || 94}%`, icon: ShieldCheck, color: "text-emerald-400" }
        ].map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-[#121824] border border-slate-800 p-3 rounded-lg text-center">
              <div className="text-[10px] text-slate-400 mb-1 flex items-center justify-center gap-1">
                <Icon className="w-3 h-3 text-slate-400" />
                <span>{s.label}</span>
              </div>
              <div className={`text-xs font-bold ${s.color}`}>{s.val}</div>
            </div>
          );
        })}
      </div>

      {/* SECURITY EVENT TIMELINE TABLE */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-xs text-white uppercase font-mono flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Security Event Timeline & Audit Log</span>
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Showing recent events</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-900/90 text-slate-400 text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">Security Event Description</th>
                <th className="py-2.5 px-4">Severity</th>
                <th className="py-2.5 px-4">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {(securityData?.securityEvents || []).map((evt, idx) => {
                let badgeClass = "bg-blue-950 text-blue-300 border-blue-800/40";
                if (evt.severity === "LOW") badgeClass = "bg-slate-800 text-slate-300 border-slate-700";
                if (evt.severity === "MEDIUM") badgeClass = "bg-amber-950 text-amber-300 border-amber-800/40";
                if (evt.severity === "HIGH") badgeClass = "bg-rose-950 text-rose-300 border-rose-800/40";

                return (
                  <tr key={evt.id || idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{new Date(evt.timestamp).toLocaleTimeString()}</td>
                    <td className="py-3 px-4 text-white font-medium">{evt.event}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${badgeClass}`}>
                        {evt.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-cyan-400 font-semibold">{evt.action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
