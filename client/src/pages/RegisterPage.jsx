import React, { useState } from "react";
import { Shield, Lock, Mail, User, Building, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage({ setActivePage }) {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    organization: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(formData);
    if (result.success) {
      setActivePage("dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 mx-auto flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 mb-3">
            <Shield className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create NetMorph Account</h2>
          <p className="text-xs text-slate-400">Join the 5G traffic security intelligence network</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Alex Morgan"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="alex@enterprise.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Organization / Telco</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Acme 5G Corp"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Account Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
            >
              <option value="USER">Standard User (Traffic Morphing Client)</option>
              <option value="ENTERPRISE">Enterprise Account Admin</option>
              <option value="PROVIDER">5G Telecom Provider Operator</option>
              <option value="ADMIN">System Administrator</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "Creating Account..." : "Register Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400">
          Already registered?{" "}
          <button onClick={() => setActivePage("login")} className="text-cyan-400 font-semibold hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
