import express from "express";
import { getCustomers, loginController } from "../controllers/user.js";
const router = express.Router();


router.get("/v1", getCustomers);
router.post("/login", loginController);
export default router;