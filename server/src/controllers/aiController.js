import aiService from "../services/aiService.js";

/**
 * Controller to handle AI analysis requests
 */
export const analyzeNetwork = async (req, res, next) => {
  try {
    const { metrics, traffic, security } = req.body;

    // Basic input validation
    if (!metrics || !traffic || !security) {
      return res.status(400).json({
        success: false,
        message: "Missing required data payloads (metrics, traffic, security)"
      });
    }

    // Call the AI Service
    const analysis = await aiService.analyzeNetworkMetrics({
      metrics,
      traffic,
      security
    });

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    // If it's a known AI Error, pass it as 503 Service Unavailable or 500
    if (error.message.includes("AI_API_KEY is not configured")) {
      return res.status(503).json({
        success: false,
        message: "AI capabilities are currently disabled (API key missing)."
      });
    }
    
    if (error.message.includes("timed out")) {
      return res.status(504).json({
        success: false,
        message: "AI Request timed out."
      });
    }

    // Forward to general error handler
    next(error);
  }
};
