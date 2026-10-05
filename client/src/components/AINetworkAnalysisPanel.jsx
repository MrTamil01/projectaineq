import React, { useState } from "react";
import { Brain, AlertTriangle, CheckCircle, ShieldAlert, TrendingUp, Zap, Loader2 } from "lucide-react";

export default function AINetworkAnalysisPanel({ currentMetrics, activeSession }) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      metrics: {
        bandwidth: currentMetrics?.throughputMbps || 0,
        latency: currentMetrics?.latency || 0,
        jitter: currentMetrics?.jitterMs || 0,
        packetLoss: currentMetrics?.packetLoss || 0,
        throughput: currentMetrics?.throughputMbps || 0
      },
      traffic: {
        type: activeSession ? "morphed" : "standard",
        activeConnections: 12, // Example placeholder or get from context if available
        congestion: currentMetrics?.overheadPercent || 0
      },
      security: {
        encryption: "AES-256-GCM",
        securityScore: currentMetrics?.securityScore || 0
      }
    };

    try {
      const response = await fetch("/api/ai/analyze-network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to analyze network.");
      }

      setAnalysis(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "LOW": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "MEDIUM": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "HIGH": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "CRITICAL": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
    }
  };

  return (
    <div className="bg-[#121824] border border-cyan-500/20 rounded-xl overflow-hidden shadow-xl mt-6">
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white">AI Network Analysis</h3>
            <p className="text-xs text-slate-400">Real-time LLM insights and optimization</p>
          </div>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          {loading ? "Analyzing..." : "Analyze Network with AI"}
        </button>
      </div>

      <div className="p-5">
        {!analysis && !error && !loading && (
          <div className="text-center py-8 text-slate-500">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Click "Analyze Network with AI" to get real-time recommendations.</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-8 text-indigo-400 flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm font-medium animate-pulse">Running advanced AI models on network metrics...</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">AI Analysis Failed</h4>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {analysis && !loading && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-500 mb-1 uppercase font-bold tracking-wider">Risk Level</div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border font-bold text-sm ${getRiskColor(analysis.riskLevel)}`}>
                  {analysis.riskLevel === "LOW" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  {analysis.riskLevel}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-500 mb-1 uppercase font-bold tracking-wider">Network Condition</div>
                <div className="font-semibold text-white">{analysis.networkCondition}</div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider">Detailed Analysis</div>
              <p className="text-sm text-slate-300 leading-relaxed">{analysis.analysis}</p>
            </div>

            {analysis.recommendations && analysis.recommendations.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" /> Recommended Actions
                </h4>
                <div className="space-y-3">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-cyan-500/20 bg-cyan-950/10 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-cyan-300 text-sm">{rec.action}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900 text-cyan-400 font-mono">PRIORITY: {rec.priority}</span>
                      </div>
                      <p className="text-xs text-slate-400">{rec.reason}</p>
                      <p className="text-xs text-emerald-400 font-medium mt-1">Impact: {rec.expectedImpact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysis.securityConcerns && analysis.securityConcerns.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-orange-400" /> Security Concerns
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.securityConcerns.map((concern, idx) => (
                    <li key={idx} className="text-sm text-orange-300">{concern}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-lg bg-indigo-950/20 border border-indigo-500/30 flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-indigo-300 text-sm">QoS Recommendation: {analysis.qosRecommendation.priority}</h4>
                <p className="text-xs text-indigo-200/70 mt-1">{analysis.qosRecommendation.reason}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
