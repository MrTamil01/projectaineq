import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("netmorph_user");
    return savedUser ? JSON.parse(savedUser) : {
      id: "usr-demo-001",
      name: "Demo Operator",
      email: "demo@netmorph.io",
      role: "USER",
      organization: "NetMorph Security Labs"
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem("netmorph_token") || "demo_jwt_token_sample");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("netmorph_token", token);
    } else {
      localStorage.removeItem("netmorph_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("netmorph_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("netmorph_user");
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed. Please check credentials."
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await API.post("/auth/register", userData);
      if (res.data.success) {
        setUser(res.data.data.user);
        setToken(res.data.data.token);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed."
      };
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = (role = "USER") => {
    let demoUser = {
      id: "usr-demo-001",
      name: "Demo Operator",
      email: "demo@netmorph.io",
      role: "USER",
      organization: "NetMorph Labs"
    };

    if (role === "ENTERPRISE") {
      demoUser = {
        id: "usr-ent-002",
        name: "Enterprise Admin",
        email: "enterprise@netmorph.io",
        role: "ENTERPRISE",
        organization: "Acme 5G Corp"
      };
    } else if (role === "PROVIDER") {
      demoUser = {
        id: "usr-prv-003",
        name: "Telecom Provider Mgr",
        email: "provider@netmorph.io",
        role: "PROVIDER",
        organization: "Aether 5G Telco"
      };
    } else if (role === "ADMIN") {
      demoUser = {
        id: "usr-adm-004",
        name: "System Administrator",
        email: "admin@netmorph.io",
        role: "ADMIN",
        organization: "NetMorph Core"
      };
    }

    setUser(demoUser);
    setToken(`demo_token_${role.toLowerCase()}_${Date.now()}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("netmorph_user");
    localStorage.removeItem("netmorph_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
