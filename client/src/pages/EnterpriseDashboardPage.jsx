import React, { useState, useEffect } from "react";
import { Building, Users, Shield, Plus, Trash2, CheckCircle2, ToggleLeft, ToggleRight, Activity, X } from "lucide-react";
import API from "../services/api";

export default function EnterpriseDashboardPage() {
  const [enterpriseData, setEnterpriseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Security Analyst" });
  const [policies, setPolicies] = useState([
    { id: "pol-01", name: "Strict TLS 1.3 Framing", enabled: true, category: "Encryption" },
    { id: "pol-02", name: "Auto Packet Size Padding (1420B MTU)", enabled: true, category: "Morphing" },
    { id: "pol-03", name: "Entropy Threshold Audit (>7.8)", enabled: true, category: "Security" },
    { id: "pol-04", name: "Low-Latency Priority Mode (URLLC)", enabled: false, category: "Performance" }
  ]);

  const fetchData = async () => {
    try {
      const res = await API.get("/enterprise/data");
      if (res.data?.success) {
        setEnterpriseData(res.data.data);
      }
    } catch (err) {
      console.warn("Enterprise fetch warning:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/enterprise/users", newUser);
      setShowAddModal(false);
      setNewUser({ name: "", email: "", role: "Security Analyst" });
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await API.delete(`/enterprise/users/${id}`);
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const togglePolicy = (id) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#121824] border border-slate-800 p-5 rounded-xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-cyan-400" />
            <span>Enterprise Organization Security Center</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 uppercase">
              ACME 5G CORP
            </span>
          </h2>
          <p className="text-xs text-slate-400">Centralized governance for organization users, security policies, and 5G traffic slice controls</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* ORG STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#121824] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] text-slate-400 mb-1">Organization SLA</div>
          <div className="text-xl font-bold text-emerald-400">ENTERPRISE SLA</div>
          <div className="text-[10px] text-slate-500 mt-1">24/7 Dedicated Support</div>
        </div>

        <div className="bg-[#121824] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] text-slate-400 mb-1">Team Seats Allocated</div>
          <div className="text-xl font-bold text-white">
            {enterpriseData?.users?.length || 4} / 25 <span className="text-xs text-slate-400 font-normal">Seats</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Acme 5G Corp License</div>
        </div>

        <div className="bg-[#121824] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] text-slate-400 mb-1">Total Data Morphing</div>
          <div className="text-xl font-bold text-blue-400">1,240 GB</div>
          <div className="text-[10px] text-slate-500 mt-1">Monthly Encrypted Volume</div>
        </div>

        <div className="bg-[#121824] border border-slate-800 p-4 rounded-xl">
          <div className="text-[10px] text-slate-400 mb-1">Org Security Score</div>
          <div className="text-xl font-bold text-emerald-400">95 / 100</div>
          <div className="text-[10px] text-slate-500 mt-1">All Policies Enforced</div>
        </div>
      </div>

      {/* TEAM MEMBERS TABLE */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow-xl space-y-3 p-5">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Users className="w-4 h-4 text-cyan-400" />
          <span>Organization Team Members & Access Roles</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">User Name</th>
                <th className="py-2.5 px-4">Email Address</th>
                <th className="py-2.5 px-4">Role</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {(enterpriseData?.users || []).map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4 text-cyan-400">{u.role}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px]">
                      {u.status || "Active"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleRemoveUser(u.id)}
                      className="p-1 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition"
                      title="Remove User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECURITY POLICIES TOGGLES */}
      <div className="bg-[#121824] border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Enterprise Security Enforcement Policies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((pol) => (
            <div
              key={pol.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                pol.enabled ? "bg-slate-900/90 border-cyan-500/30 text-white" : "bg-slate-900/40 border-slate-800 text-slate-400"
              }`}
            >
              <div>
                <div className="text-xs font-bold font-mono mb-1">{pol.name}</div>
                <div className="text-[10px] text-slate-500 font-mono">Category: {pol.category}</div>
              </div>

              <button
                onClick={() => togglePolicy(pol.id)}
                className={`p-1 rounded text-lg transition ${pol.enabled ? "text-cyan-400" : "text-slate-600"}`}
              >
                {pol.enabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121824] border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Add Enterprise Team Member</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Sarah Connor"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="sarah@acme5g.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white outline-none focus:border-cyan-500"
                >
                  <option value="Security Analyst">Security Analyst</option>
                  <option value="Network Architect">Network Architect</option>
                  <option value="Compliance Lead">Compliance Lead</option>
                  <option value="SecOps Lead">SecOps Lead</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs shadow-lg shadow-cyan-500/20"
              >
                Add User to Acme 5G Org
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
