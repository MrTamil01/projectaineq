import React, { useState } from "react";
import { Code2, Play, CheckCircle2, Copy, Check } from "lucide-react";
import API from "../services/api";

export default function ApiDocsPage() {
  const [activeEndpoint, setActiveEndpoint] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const endpoints = [
    {
      method: "POST",
      path: "/api/auth/login",
      desc: "Authenticate operator and receive JWT token",
      body: { email: "demo@netmorph.io", password: "password123" }
    },
    {
      method: "GET",
      path: "/api/sessions",
      desc: "Retrieve list of active and historical traffic morphing sessions",
      body: null
    },
    {
      method: "POST",
      path: "/api/morph/start",
      desc: "Initialize and activate a controlled simulated morphing session",
      body: { source: "Browser", trafficType: "Video", morphProfile: "video-stream-like", performanceMode: "Balanced" }
    },
    {
      method: "GET",
      path: "/api/morph/profiles",
      desc: "Get available protocol morphing profiles specification",
      body: null
    },
    {
      method: "GET",
      path: "/api/analytics",
      desc: "Retrieve real-time performance analytics & telemetry summary",
      body: null
    },
    {
      method: "GET",
      path: "/api/security/events",
      desc: "Fetch security status, encryption state, and audit timeline",
      body: null
    },
    {
      method: "GET",
      path: "/api/provider/metrics",
      desc: "Get 5G telecom provider monetization metrics and service tiers",
      body: null
    },
    {
      method: "GET",
      path: "/api/enterprise/data",
      desc: "Retrieve organization user list, active SLA, and security policies",
      body: null
    }
  ];

  const testEndpoint = async (ep) => {
    setActiveEndpoint(ep.path);
    setLoading(true);
    setApiResponse(null);
    try {
      let res;
      if (ep.method === "POST") {
        res = await API.post(ep.path.replace("/api", ""), ep.body || {});
      } else {
        res = await API.get(ep.path.replace("/api", ""));
      }
      setApiResponse(res.data);
    } catch (err) {
      setApiResponse(err.response?.data || { success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const copySnippet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>REST API Documentation & Interactive Console</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
            LIVE REST ENDPOINTS
          </span>
        </h2>
        <p className="text-xs text-slate-400">Complete API reference for NetMorph 5G traffic morphing platform with live test runner</p>
      </div>

      {/* ENDPOINTS LIST & TEST RUNNER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoints List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
            Available Endpoints
          </h3>

          {endpoints.map((ep, idx) => (
            <div
              key={idx}
              className="bg-[#121824] border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-2 shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      ep.method === "POST"
                        ? "bg-cyan-950 text-cyan-400 border border-cyan-500/30"
                        : "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-white font-bold">{ep.path}</span>
                </div>

                <button
                  onClick={() => testEndpoint(ep)}
                  className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono flex items-center gap-1 transition"
                >
                  <Play className="w-3 h-3 text-cyan-400 fill-current" />
                  <span>Test API</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 font-mono">{ep.desc}</p>
            </div>
          ))}
        </div>

        {/* Live Response Output Viewer */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
            Live Response Console Output {activeEndpoint && <span className="text-cyan-400">({activeEndpoint})</span>}
          </h3>

          <div className="bg-[#0e131f] border border-slate-800 rounded-xl p-4 min-h-[400px] font-mono text-xs space-y-3 shadow-2xl">
            {loading ? (
              <div className="flex items-center justify-center h-64 text-cyan-400 gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></div>
                <span>Executing API HTTP Request...</span>
              </div>
            ) : apiResponse ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px]">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    HTTP 200 OK
                  </span>
                  <button
                    onClick={() => copySnippet(JSON.stringify(apiResponse, null, 2), 99)}
                    className="text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 99 ? "Copied" : "Copy JSON"}</span>
                  </button>
                </div>
                <pre className="text-cyan-300 overflow-x-auto text-[11px] leading-relaxed max-h-[500px] overflow-y-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-slate-500 text-center py-20 text-xs">
                Click any "Test API" button on the left to execute a live backend request and view response JSON schema.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
