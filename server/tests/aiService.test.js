import test from "node:test";
import assert from "node:assert";
import aiService from "../src/services/aiService.js";

test("aiService", async (t) => {
  const mockData = {
    metrics: { bandwidth: 100, latency: 45, jitter: 8, packetLoss: 2, throughput: 82 },
    traffic: { type: "video", activeConnections: 25, congestion: 60 },
    security: { encryption: "AES-256-GCM", securityScore: 80 }
  };

  await t.test("should throw error if API key is not configured", async () => {
    // Temporarily remove API key
    const originalKey = aiService.apiKey;
    aiService.apiKey = null;
    
    try {
      await aiService.analyzeNetworkMetrics(mockData);
      assert.fail("Should have thrown an error");
    } catch (err) {
      assert.strictEqual(err.message, "AI_API_KEY is not configured.");
    } finally {
      aiService.apiKey = originalKey; // Restore
    }
  });

  await t.test("should format and validate a valid JSON response correctly", () => {
    const validRawResponse = {
      riskLevel: "LOW",
      networkCondition: "Stable",
      analysis: "Network is performing well.",
      recommendations: [{ action: "None", reason: "All good", priority: "LOW", expectedImpact: "Maintain state" }],
      securityConcerns: [],
      qosRecommendation: { priority: "NORMAL", reason: "Standard traffic" }
    };

    const formatted = aiService.validateAndFormatResponse(validRawResponse);
    
    assert.strictEqual(formatted.riskLevel, "LOW");
    assert.strictEqual(formatted.networkCondition, "Stable");
    assert.deepStrictEqual(formatted.securityConcerns, []);
  });

  await t.test("should provide defaults for missing fields in validation", () => {
    const incompleteResponse = {
      riskLevel: "MEDIUM"
    };

    const formatted = aiService.validateAndFormatResponse(incompleteResponse);
    
    assert.strictEqual(formatted.riskLevel, "MEDIUM");
    assert.strictEqual(formatted.networkCondition, "Analysis unavailable");
    assert.deepStrictEqual(formatted.recommendations, []);
  });

  // To test actual fetch failure or timeout, we could mock global.fetch, 
  // but node built-in test runner might require manual overriding.
  await t.test("should handle fetch API failure (mocked)", async () => {
    const originalFetch = global.fetch;
    const originalKey = aiService.apiKey;
    
    aiService.apiKey = "test-key";
    
    global.fetch = async () => {
      return {
        ok: false,
        status: 500,
        text: async () => "Internal Server Error"
      };
    };
    
    try {
      await aiService.analyzeNetworkMetrics(mockData);
      assert.fail("Should have thrown an error");
    } catch (err) {
      assert.match(err.message, /Failed to analyze network with AI: AI API Error \(500\): Internal Server Error/);
    } finally {
      global.fetch = originalFetch;
      aiService.apiKey = originalKey;
    }
  });
});
