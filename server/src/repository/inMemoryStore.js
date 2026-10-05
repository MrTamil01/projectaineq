import bcrypt from "bcryptjs";
import { PROTOCOL_PROFILES, INITIAL_SECURITY_EVENTS } from "../config/constants.js";

class InMemoryStore {
  constructor() {
    this.users = [];
    this.sessions = [];
    this.packets = [];
    this.securityEvents = [...INITIAL_SECURITY_EVENTS];
    this.profiles = [...PROTOCOL_PROFILES];
    this.analyticsHistory = [];
    this.enterpriseUsers = [
      { id: "eu-101", name: "Alice Vance", email: "alice@acme5g.com", role: "SecOps Lead", status: "Active" },
      { id: "eu-102", name: "Bob Miller", email: "bob@acme5g.com", role: "Network Architect", status: "Active" },
      { id: "eu-103", name: "Carol Danvers", email: "carol@acme5g.com", role: "Security Analyst", status: "Active" },
      { id: "eu-104", name: "David Kim", email: "david@acme5g.com", role: "Compliance Officer", status: "Inactive" }
    ];
    this.seedDefaultUsers();
    this.seedAnalyticsHistory();
  }

  async seedDefaultUsers() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    this.users = [
      {
        id: "usr-demo-001",
        name: "Demo Operator",
        email: "demo@netmorph.io",
        password: hashedPassword,
        role: "USER",
        organization: "NetMorph Labs",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr-ent-002",
        name: "Enterprise Admin",
        email: "enterprise@netmorph.io",
        password: hashedPassword,
        role: "ENTERPRISE",
        organization: "Acme 5G Corp",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr-prv-003",
        name: "Telecom Provider Mgr",
        email: "provider@netmorph.io",
        password: hashedPassword,
        role: "PROVIDER",
        organization: "Aether 5G Telco",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr-adm-004",
        name: "System Administrator",
        email: "admin@netmorph.io",
        password: hashedPassword,
        role: "ADMIN",
        organization: "NetMorph Core",
        createdAt: new Date().toISOString()
      }
    ];
  }

  seedAnalyticsHistory() {
    const now = Date.now();
    for (let i = 20; i >= 0; i--) {
      const ts = new Date(now - i * 30000).toLocaleTimeString();
      this.analyticsHistory.push({
        timestamp: ts,
        latency: Math.floor(14 + Math.random() * 8),
        latencyBefore: Math.floor(11 + Math.random() * 5),
        throughputMbps: Math.floor(650 + Math.random() * 250),
        packetsPerSec: Math.floor(1200 + Math.random() * 800),
        overheadPercent: parseFloat((3.5 + Math.random() * 3).toFixed(2)),
        securityScore: Math.floor(92 + Math.random() * 6),
        jitterMs: Math.floor(1 + Math.random() * 4)
      });
    }
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  // Sessions
  createSession(sessionData) {
    const session = {
      id: `sess-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      startTime: new Date().toISOString(),
      status: "ACTIVE",
      packetsProcessed: 0,
      bytesProcessed: 0,
      avgLatencyMs: sessionData.latency || 18,
      ...sessionData
    };
    this.sessions.unshift(session);
    return session;
  }

  getSessions() {
    return this.sessions;
  }

  getSessionById(id) {
    return this.sessions.find(s => s.id === id);
  }

  updateSession(id, updates) {
    const session = this.getSessionById(id);
    if (session) {
      Object.assign(session, updates);
    }
    return session;
  }

  terminateSession(id) {
    return this.updateSession(id, {
      status: "TERMINATED",
      endTime: new Date().toISOString()
    });
  }

  // Packets
  addPacket(packet) {
    this.packets.unshift(packet);
    if (this.packets.length > 500) {
      this.packets.pop();
    }
    return packet;
  }

  getPacketsBySession(sessionId, limit = 50) {
    return this.packets.filter(p => p.sessionId === sessionId).slice(0, limit);
  }

  getAllPackets(limit = 100) {
    return this.packets.slice(0, limit);
  }

  // Security Events
  addSecurityEvent(eventData) {
    const evt = {
      id: `sec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...eventData
    };
    this.securityEvents.unshift(evt);
    return evt;
  }

  getSecurityEvents() {
    return this.securityEvents;
  }

  // Profiles
  getProfiles() {
    return this.profiles;
  }

  getProfileById(id) {
    return this.profiles.find(p => p.id === id);
  }

  // Analytics
  addAnalyticsPoint(point) {
    this.analyticsHistory.push(point);
    if (this.analyticsHistory.length > 100) {
      this.analyticsHistory.shift();
    }
    return point;
  }

  getAnalyticsHistory() {
    return this.analyticsHistory;
  }

  // Enterprise Users
  getEnterpriseUsers() {
    return this.enterpriseUsers;
  }

  addEnterpriseUser(user) {
    const newUser = {
      id: `eu-${Date.now()}`,
      status: "Active",
      ...user
    };
    this.enterpriseUsers.push(newUser);
    return newUser;
  }

  removeEnterpriseUser(id) {
    this.enterpriseUsers = this.enterpriseUsers.filter(u => u.id !== id);
    return true;
  }
}

export const inMemoryStore = new InMemoryStore();
