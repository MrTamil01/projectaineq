# NetMorph — 5G-Native Secure Traffic Morphing Platform

[![5G-Native](https://img.shields.io/badge/5G-Native-00f0ff?style=flat-square)](#)
[![Security](https://img.shields.io/badge/Encryption-AES--256--GCM-10b981?style=flat-square)](#)
[![Status](https://img.shields.io/badge/Prototype-Fully%20Functional-8b5cf6?style=flat-square)](#)

NetMorph is a 5G-oriented secure communication platform prototype that demonstrates how encrypted application traffic can be dynamically transformed into protocol-like traffic patterns (such as DNS-like, Video-streaming-like, Gaming-like, and standard HTTPS-like traffic) over 5G network slices.

---

## 📌 Problem Statement

Modern network traffic analysis and deep packet inspection (DPI) technologies can often fingerprint encrypted application traffic based on packet sizes, inter-packet arrival timing, burst patterns, and entropy signatures—even when the underlying payload is encrypted with TLS. This allows third-party observers or unauthorized network middleboxes to detect application usage patterns and compromise subscriber privacy.

---

## 💡 Proposed Solution

**NetMorph** introduces controlled, entropic metadata traffic morphing integrated with 5G Quality of Service (QoS) slicing (URLLC & eMBB). It encapsulates encrypted payloads within standardized protocol envelopes and shapes packet size distributions to match high-entropy target protocol profiles, significantly reducing traffic fingerprint visibility while maintaining ultra-low latency.

> ⚠️ **Controlled Demo Environment Disclaimer**: NetMorph is designed strictly for educational, research, and technical project presentation purposes. It implements controlled simulations and does not execute real-world network evasion, censorship bypass, credential interception, or unauthorized network manipulation.

---

## ✨ Key Features

1. **Traffic Morphing Engine**: Real-time transformation of raw payload metadata into HTTPS-like, DNS-like, Video-stream-like, and Gaming-like signatures.
2. **End-to-End Encryption Envelope**: AES-256-GCM context initialization with dynamic ephemeral key rotation.
3. **5G Performance & QoS Simulator**: Interactive sliders for bandwidth (10 Mbps to 1 Gbps), latency (5 ms to 200 ms), jitter, and packet loss with real-time score recalculation.
4. **Live Traffic Telemetry Monitor**: Sub-second Socket.IO packet stream visualization and trajectory flow pipeline.
5. **Security Center & Threat Timeline**: Encryption state tracking, JWT authentication verification, entropy auditing (>7.8), and key rotation event logging.
6. **Performance & Security Analytics**: Recharts visualizations for latency, throughput, packet processing rate, overhead, before vs after comparative stats, and dynamic NetMorph Performance Score calculation.
7. **Telecom Provider Monetization Dashboard**: Interactive subscriber revenue simulator and 5G service tier breakdown (FREE, PRO, ENTERPRISE).
8. **Enterprise Organization Governance**: User access roles, active SLA tracking, and policy enforcement toggles (Strict TLS, MTU Padding, Entropy Thresholds).
9. **Interactive Presentation Demo Mode**: One-click guided 6-step automated demo sequence with progress indicator bar and final audit report modal.
10. **Interactive Architecture Topology & API Docs**: Clickable component data flow model and live REST endpoint runner console.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Recharts, Lucide React icons, Socket.IO Client.
- **Backend**: Node.js, Express.js, Socket.IO, Helmet, CORS, Express-Rate-Limit, bcryptjs, jsonwebtoken.
- **Database**: MongoDB with Mongoose + Automatic In-Memory Repository Fallback (ensures 100% working demo even if MongoDB is not running locally).

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 2. Setup Dependencies
From the root directory, run:

```bash
npm run setup
```

*(This will install dependencies for root, server, and client directories automatically).*

### 3. Run Development Environment
To start both backend server (Port 5000) and frontend client (Port 5173) concurrently:

```bash
npm run dev
```

Open your browser and navigate to:
**`http://localhost:5173`**

---

## 🔑 Pre-Configured Demo Credentials

The application comes pre-loaded with demonstration accounts for instant presentation testing:

| Role | Email | Password | Primary Dashboard |
| :--- | :--- | :--- | :--- |
| **Demo Operator** | `demo@netmorph.io` | `password123` | Main Dashboard & Morphing Console |
| **Enterprise Admin** | `enterprise@netmorph.io` | `password123` | Enterprise Organization Center |
| **Telecom Provider** | `provider@netmorph.io` | `password123` | 5G Provider Monetization |
| **System Admin** | `admin@netmorph.io` | `password123` | Full Administrative Access |

*(You can also use the single-click Role Switcher menu directly in the top Navbar!)*

---

## 📡 REST API Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate user and obtain JWT token |
| `POST` | `/api/auth/register` | Register new user account |
| `GET` | `/api/sessions` | List active and historical morphing sessions |
| `POST` | `/api/morph/start` | Start a traffic morphing session |
| `POST` | `/api/morph/stop` | Terminate an active session |
| `GET` | `/api/morph/profiles` | Get available protocol morphing profiles |
| `GET` | `/api/analytics` | Retrieve real-time performance telemetry |
| `GET` | `/api/security/events` | Get security state & event audit log |
| `GET` | `/api/provider/metrics` | Get 5G provider monetization stats |
| `GET` | `/api/enterprise/data` | Get enterprise organization users & policies |

---

## 🎬 Presentation Demo Sequence

When demonstrating NetMorph live:
1. Launch NetMorph and click **"Run Live Demo"** in the top banner or navigation sidebar.
2. Watch the automated 6-step sequence execute:
   - `STEP 1: CONNECT` — 5G gNodeB slice handshake
   - `STEP 2: ENCRYPT` — AES-256 context & JWT verified
   - `STEP 3: MORPH` — Video-Stream-Like profile applied
   - `STEP 4: TRANSMIT` — 120+ packets streamed over 5G transport
   - `STEP 5: ANALYZE` — Sub-second telemetry & entropy verified (7.98)
   - `STEP 6: COMPLETE` — Final Audit Summary Report modal presented
3. Navigate to **"5G Simulator"** and adjust the Bandwidth & Latency sliders to show dynamic performance adaptation.
4. Open **"Provider Dashboard"** to explain how telecom operators monetize privacy slices.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
