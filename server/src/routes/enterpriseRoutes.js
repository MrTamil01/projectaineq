import express from "express";
import { getEnterpriseData, addEnterpriseUser, removeEnterpriseUser } from "../controllers/enterpriseController.js";

const router = express.Router();

router.get("/data", getEnterpriseData);
router.get("/dashboard", getEnterpriseData);
router.post("/users", addEnterpriseUser);
router.delete("/users/:id", removeEnterpriseUser);

export default router;
