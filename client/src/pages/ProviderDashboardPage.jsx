import React, { useState } from "react";
import { Building2, Users, DollarSign, Activity, Zap, CheckCircle2, Shield, AlertTriangle } from "lucide-react";

export default function ProviderDashboardPage() {
  const [proUsersCount, setProUsersCount] = useState(4120);
  const [enterpriseOrgsCount, setEnterpriseOrgsCount] = useState(380);

  // Revenue calculation demo ($15/pro, $499/enterprise)
  const calcRevenue = (proUsersCount * 15) + (enterpriseOrgsCount * 499);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" />
            <span>5G Telecom Provider Monetization Dashboard</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40 uppercase">
              TELCO MONETIZATION
            </span>
          </h2>
          <p className="text-xs text-slate-400">Demonstrates how 5G mobile operators offer NetMorph traffic morphing as a premium revenue-generating security service</p>
        </div>

        <div className="text-[10px] font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Illustrative Demo Data</span>
        </div>
      </div>

      {/* 8 TELECOM PROVIDER METRICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        {[
          { label: "Total 5G Subscribers", val: "14,250", sub: "Active Telco Network", color: "text-white" },
          { label: "Active Secure Sessions", val: "1,842", sub: "Live Morphing Tunnels", color: "text-cyan-400" },
          { label: "Network Slice Utilization", val: "68.4%", sub: "gNodeB QoS Capacity", color: "text-purple-400" },
          { label: "Premium Slice Users", val: (proUsersCount + enterpriseOrgsCount).toLocaleString(), sub: "Paid Privacy Tiers", color: "text-emerald-400" },
          { label: "Traffic Processed", val: "48.6 TB", sub: "Monthly Volume", color: "text-blue-400" },
          { label: "Avg Slice Latency", val: "14 ms", sub: "URLLC Guaranteed", color: "text-amber-400" },
          { label: "Monthly Data Usage", val: "48,600 GB", sub: "Encrypted Payload Volume", color: "text-indigo-400" },
          { label: "Est. Monthly Revenue", val: `$${calcRevenue.toLocaleString()}`, sub: "Telco Premium Revenue", color: "text-emerald-400 font-extrabold" }
        ].map((m, idx) => (
          <div key={idx} className="bg-[#121824] border border-slate-800 p-4 rounded-xl">
            <div className="text-[10px] text-slate-400 mb-1">{m.label}</div>
            <div className={`text-xl font-bold ${m.color}`}>{m.val}</div>
            <div className="text-[10px] text-slate-500 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* SERVICE TIERS SPECIFICATION CARDS */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>NetMorph 5G Provider Service Tiers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "FREE TIER",
              price: "$0 / mo",
              target: "Standard Mobile Subscribers",
              features: [
                "Basic HTTPS traffic morphing simulation",
                "Standard 5G transport slice",
                "Community forum support"
              ],
              throughput: "50 Mbps",
              priority: "Standard Best-Effort",
              bg: "border-slate-800"
            },
            {
              name: "PRO TIER",
              price: "$15 / user / mo",
              target: "Privacy-Conscious Professionals",
              features: [
                "Advanced DNS & Video morphing profiles",
                "Priority 5G Slice allocation (eMBB)",
                "Real-time security analytics & telemetry",
                "Sub-15ms low-latency tuning"
              ],
              throughput: "500 Mbps",
              priority: "High Priority",
              bg: "border-cyan-500/50 shadow-cyan-950/40 bg-gradient-to-b from-cyan-950/20 to-slate-900"
            },
            {
              name: "ENTERPRISE TIER",
              price: "$499 / org / mo",
              target: "Corporate 5G Slice Clients",
              features: [
                "Custom protocol pattern creation",
                "Dedicated URLLC 5G Network Slice",
                "Centralized enterprise policy management",
                "Unlimited throughput & 24/7 SLA"
              ],
              throughput: "10 Gbps Dedicated",
              priority: "Ultra-High URLLC",
              bg: "border-purple-500/50 shadow-purple-950/40 bg-gradient-to-b from-purple-950/20 to-slate-900"
            }
          ].map((tier, idx) => (
            <div key={idx} className={`bg-[#121824] border rounded-xl p-6 shadow-xl space-y-4 ${tier.bg}`}>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-bold">
                  {tier.name}
                </span>
                <div className="text-2xl font-extrabold text-white font-mono mt-2">{tier.price}</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{tier.target}</div>
              </div>

              <div className="space-y-2 py-3 border-t border-b border-slate-800 text-xs font-mono">
                {tier.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div>Max Throughput: <strong className="text-white">{tier.throughput}</strong></div>
                <div>Slice Priority: <strong className="text-cyan-400">{tier.priority}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVENUE CALCULATOR SLIDER */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Interactive Telecom Monetization Revenue Simulator</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Pro Subscriber Volume:</span>
              <span className="text-cyan-400 font-bold">{proUsersCount.toLocaleString()} Users</span>
            </div>
            <input
              type="range"
              min="500"
              max="20000"
              step="100"
              value={proUsersCount}
              onChange={(e) => setProUsersCount(parseInt(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="text-[10px] text-slate-500">Revenue @ $15/user: ${(proUsersCount * 15).toLocaleString()}/mo</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>Enterprise Org Subscribers:</span>
              <span className="text-purple-400 font-bold">{enterpriseOrgsCount} Orgs</span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="10"
              value={enterpriseOrgsCount}
              onChange={(e) => setEnterpriseOrgsCount(parseInt(e.target.value))}
              className="w-full accent-purple-400 bg-slate-900 h-2 rounded cursor-pointer"
            />
            <div className="text-[10px] text-slate-500">Revenue @ $499/org: ${(enterpriseOrgsCount * 499).toLocaleString()}/mo</div>
          </div>
        </div>
      </div>
    </div>
  );
}
