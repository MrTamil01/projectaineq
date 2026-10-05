import express from "express";
import { getSessions, getSessionById, startSession, createSession, stopSession, terminateSession } from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", getSessions);
router.post("/start", startSession);
router.post("/stop", stopSession);
router.get("/:id", getSessionById);
router.post("/", createSession);
router.delete("/:id", terminateSession);

export default router;
