import React, { useState, useEffect } from "react";
import { Clock, Square, Eye, X, CheckCircle, AlertOctagon, Activity } from "lucide-react";
import API from "../services/api";
import { useSimulation } from "../context/SimulationContext";

export default function SessionManagementPage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionPackets, setSessionPackets] = useState([]);
  const { stopSession } = useSimulation();

  const fetchSessions = async () => {
    try {
      const res = await API.get("/sessions");
      if (res.data?.success) {
        setSessions(res.data.data.sessions);
      }
    } catch (err) {
      console.warn("Sessions fetch warning:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleTerminate = async (sessionId) => {
    try {
      await API.delete(`/sessions/${sessionId}`);
      await stopSession();
      await fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = async (session) => {
    setSelectedSession(session);
    try {
      const res = await API.get(`/sessions/${session.sessionId}`);
      if (res.data?.success) {
        setSessionPackets(res.data.data.packets || []);
      }
    } catch (err) {
      setSessionPackets([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>5G Morphing Session Management</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              AUDIT LOG
            </span>
          </h2>
          <p className="text-xs text-slate-400">View active and historical traffic morphing sessions, processed bytes, and session teardown controls</p>
        </div>
      </div>

      {/* SESSIONS TABLE */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-900 text-slate-400 text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Session ID</th>
                <th className="py-3 px-4">Operator / User</th>
                <th className="py-3 px-4">Start Time</th>
                <th className="py-3 px-4">Profile</th>
                <th className="py-3 px-4">Packets</th>
                <th className="py-3 px-4">Data Processed</th>
                <th className="py-3 px-4">Avg Latency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sessions.map((s, idx) => (
                <tr key={s.sessionId || s.id || idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-400">{s.sessionId || s.id}</td>
                  <td className="py-3 px-4 text-white">{s.userName || "Demo Operator"}</td>
                  <td className="py-3 px-4 text-slate-400">{new Date(s.startTime).toLocaleTimeString()}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/40 text-[10px] uppercase">
                      {s.morphProfile}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{s.packetsProcessed || 48}</td>
                  <td className="py-3 px-4 text-emerald-400">{((s.bytesProcessed || 52400) / 1024).toFixed(1)} KB</td>
                  <td className="py-3 px-4 text-slate-300">{s.avgLatencyMs || 18} ms</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        s.status === "ACTIVE"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {s.status === "ACTIVE" ? <Activity className="w-3 h-3 text-emerald-400 animate-spin" /> : null}
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleViewDetails(s)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Details</span>
                    </button>
                    {s.status === "ACTIVE" && (
                      <button
                        onClick={() => handleTerminate(s.sessionId || s.id)}
                        className="px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 text-[11px] transition inline-flex items-center gap-1"
                      >
                        <Square className="w-3 h-3" />
                        <span>Terminate</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SESSION DETAIL MODAL */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>Session Deep Dive: {selectedSession.sessionId || selectedSession.id}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs">
              <div>
                <div className="text-[10px] text-slate-500">TRAFFIC TYPE</div>
                <div className="text-white font-bold">{selectedSession.trafficType}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">PROFILE</div>
                <div className="text-cyan-400 font-bold">{selectedSession.morphProfile}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">ENCRYPTION</div>
                <div className="text-emerald-400 font-bold">{selectedSession.encryption}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">MODE</div>
                <div className="text-indigo-400 font-bold">{selectedSession.performanceMode}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 font-mono">Sample Transformed Packets ({sessionPackets.length})</h4>
              <div className="max-h-48 overflow-y-auto bg-slate-900/90 rounded-lg border border-slate-800 p-3 space-y-1 text-[11px] font-mono">
                {sessionPackets.length > 0 ? (
                  sessionPackets.map((pkt, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800/60 text-slate-300">
                      <span className="text-cyan-400 font-bold">{pkt.packetId}</span>
                      <span>{pkt.originalSize}B → <strong className="text-emerald-400">{pkt.transformedSize}B</strong></span>
                      <span className="text-amber-400">{pkt.latency}ms</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">No logged packets available for this session.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
