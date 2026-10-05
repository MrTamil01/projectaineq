import React, { useState } from "react";
import { Shield, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ setActivePage }) {
  const { login, loginAsDemo, loading } = useAuth();
  const [email, setEmail] = useState("demo@netmorph.io");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
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
          <h2 className="text-2xl font-bold text-white">Sign In to NetMorph</h2>
          <p className="text-xs text-slate-400">Access your 5G traffic morphing security dashboard</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 focus:border-cyan-500 text-white font-mono outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* DEMO QUICK LOGIN SHORTCUTS */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-[11px] font-mono text-slate-400 text-center uppercase tracking-wider">
            PRE-CONFIGURED DEMO ACCOUNTS
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {[
              { role: "USER", label: "Demo User", email: "demo@netmorph.io" },
              { role: "ENTERPRISE", label: "Enterprise", email: "enterprise@netmorph.io" },
              { role: "PROVIDER", label: "Telco Provider", email: "provider@netmorph.io" },
              { role: "ADMIN", label: "System Admin", email: "admin@netmorph.io" }
            ].map((acc) => (
              <button
                key={acc.role}
                onClick={() => {
                  loginAsDemo(acc.role);
                  setActivePage("dashboard");
                }}
                className="p-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-left hover:border-cyan-500/30 transition text-[11px]"
              >
                <div className="text-cyan-400 font-bold flex items-center justify-between">
                  <span>{acc.label}</span>
                  <UserCheck className="w-3 h-3 text-slate-500" />
                </div>
                <div className="text-slate-400 text-[10px] truncate">{acc.email}</div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{" "}
          <button onClick={() => setActivePage("register")} className="text-cyan-400 font-semibold hover:underline">
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
