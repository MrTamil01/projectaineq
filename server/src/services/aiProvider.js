/**
 * Abstract base class for AI Providers.
 * This ensures any AI model we integrate follows the same interface.
 */
export default class AIProvider {
  /**
   * Analyzes network metrics and returns structured JSON recommendations.
   * @param {Object} data - The network, traffic, and security data.
   * @returns {Promise<Object>} The structured JSON analysis.
   */
  async analyzeNetworkMetrics(data) {
    throw new Error("analyzeNetworkMetrics must be implemented by subclass");
  }
}
