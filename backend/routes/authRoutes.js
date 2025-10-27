import express from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { googleAuth, socialAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
router.post("/google", googleAuth);
router.post("/github", socialAuth);

export default router;
