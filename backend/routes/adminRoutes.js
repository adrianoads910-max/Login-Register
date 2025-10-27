import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser, updateUserByAdmin } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);        // Listar usuários
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);  // Deletar usuário
router.put("/users/:id", verifyToken, verifyAdmin, updateUserByAdmin); // Editar usuário

export default router;
