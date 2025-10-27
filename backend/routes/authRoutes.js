import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

export default router;
