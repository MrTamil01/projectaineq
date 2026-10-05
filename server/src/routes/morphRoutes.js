import express from "express";
import { startMorph, stopMorph, getMorphSession, getProfiles, getNetworkConditions, updateNetworkConditions } from "../controllers/morphController.js";

const router = express.Router();

router.post("/start", startMorph);
router.post("/stop", stopMorph);
router.get("/profiles", getProfiles);
router.get("/network-conditions", getNetworkConditions);
router.post("/network-conditions", updateNetworkConditions);
router.get("/:sessionId", getMorphSession);

export default router;
