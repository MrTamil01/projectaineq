import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SimulationProvider } from "./context/SimulationContext";

import DemoBanner from "./components/DemoBanner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TrafficConsolePage from "./pages/TrafficConsolePage";
import TrafficMorphingPage from "./pages/TrafficMorphingPage";
import LiveMonitorPage from "./pages/LiveMonitorPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SecurityPage from "./pages/SecurityPage";
import ProtocolProfilesPage from "./pages/ProtocolProfilesPage";
import SessionManagementPage from "./pages/SessionManagementPage";
import FiveGSimulatorPage from "./pages/FiveGSimulatorPage";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";
import EnterpriseDashboardPage from "./pages/EnterpriseDashboardPage";
import DemoModePage from "./pages/DemoModePage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ApiDocsPage from "./pages/ApiDocsPage";
import SettingsPage from "./pages/SettingsPage";

function MainLayout() {
  const [activePage, setActivePage] = useState("landing");
  const { isAuthenticated } = useAuth();

  const renderPage = () => {
    switch (activePage) {
      case "landing":
        return <LandingPage setActivePage={setActivePage} />;
      case "login":
        return <LoginPage setActivePage={setActivePage} />;
      case "register":
        return <RegisterPage setActivePage={setActivePage} />;
      case "dashboard":
        return <DashboardPage setActivePage={setActivePage} />;
      case "traffic-console":
      case "traffic-morphing":
        return <TrafficMorphingPage />;
      case "live-monitor":
        return <LiveMonitorPage />;
      case "analytics":
      case "privacy-analytics":
        return <AnalyticsPage />;
      case "security":
        return <SecurityPage />;
      case "protocol-profiles":
        return <ProtocolProfilesPage setActivePage={setActivePage} />;
      case "sessions":
        return <SessionManagementPage />;
      case "5g-simulator":
        return <FiveGSimulatorPage />;
      case "provider":
        return <ProviderDashboardPage />;
      case "enterprise":
        return <EnterpriseDashboardPage />;
      case "demo-mode":
        return <DemoModePage setActivePage={setActivePage} />;
      case "architecture":
        return <ArchitecturePage />;
      case "api-docs":
        return <ApiDocsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 font-sans">
      <DemoBanner />
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex overflow-hidden">
        {activePage !== "landing" && activePage !== "login" && activePage !== "register" && (
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        )}

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto max-w-full">
          {renderPage()}
          <Footer setActivePage={setActivePage} />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <MainLayout />
      </SimulationProvider>
    </AuthProvider>
  );
}
