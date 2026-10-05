import express from "express";
import {
  getAnalytics,
  getComparisonData,
  getPrivacyAnalytics,
  getSecurityAnalytics,
  getQoSAnalytics
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", getAnalytics);
router.get("/comparison", getComparisonData);
router.get("/privacy", getPrivacyAnalytics);
router.get("/security", getSecurityAnalytics);
router.get("/qos", getQoSAnalytics);

export default router;
