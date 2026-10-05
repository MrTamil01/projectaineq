import express from "express";
import { getSecurityOverview, triggerSecurityAction } from "../controllers/securityController.js";

const router = express.Router();

router.get("/events", getSecurityOverview);
router.post("/action", triggerSecurityAction);

export default router;
