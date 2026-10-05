import express from "express";
import { getProviderMetrics } from "../controllers/providerController.js";

const router = express.Router();

router.get("/metrics", getProviderMetrics);
router.get("/dashboard", getProviderMetrics);

export default router;
