import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePhoto,
  socialLogin, // ✅ nome corrigido
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Registro e login tradicional
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Login social (Google / GitHub)
router.post("/social-login", socialLogin);

// ✅ Perfil autenticado
router.get("/me", verifyToken, getProfile);

// ✅ Atualização de perfil completo
router.put("/profile", verifyToken, updateProfile);

// ✅ Atualização só da foto
router.put("/photo", verifyToken, updatePhoto);

export default router;
