export const getProviderMetrics = (req, res) => {
  const subscribers = 14250;
  const proSubscribers = 4120;
  const enterpriseSubscribers = 380;
  const freeSubscribers = subscribers - proSubscribers - enterpriseSubscribers;

  // Monthly revenue calculation demo (Free $0, Pro $15/mo, Enterprise $499/mo)
  const monthlyRevenue = (proSubscribers * 15) + (enterpriseSubscribers * 499);

  res.json({
    success: true,
    data: {
      metrics: {
        totalSubscribers: subscribers,
        activeSecureSessions: 1842,
        networkUtilization: 68.4,
        premiumUsers: proSubscribers + enterpriseSubscribers,
        trafficProcessedTB: 48.6,
        avgLatencyMs: 14,
        monthlyUsageGB: 48600,
        monthlyRevenueUSD: monthlyRevenue,
        disclaimer: "Illustrative Demo Data for 5G Telecom Monetization Simulation"
      },
      serviceTiers: [
        {
          name: "FREE",
          price: "$0 / mo",
          features: ["Basic HTTPS traffic morphing", "Standard 5G transport", "Community support"],
          maxThroughput: "50 Mbps",
          priority: "Standard",
          subscribersCount: freeSubscribers
        },
        {
          name: "PRO",
          price: "$15 / user / mo",
          features: ["Advanced DNS & Video morphing profiles", "Priority 5G Slice allocation", "Real-time security analytics", "Low-latency tuning"],
          maxThroughput: "500 Mbps",
          priority: "High",
          subscribersCount: proSubscribers
        },
        {
          name: "ENTERPRISE",
          price: "$499 / org / mo",
          features: ["Custom protocol pattern creation", "Dedicated 5G Network Slice", "Centralized policy management", "Unlimited throughput", "24/7 SLA & Dedicated Support"],
          maxThroughput: "10 Gbps",
          priority: "Ultra-High",
          subscribersCount: enterpriseSubscribers
        }
      ]
    }
  });
};
