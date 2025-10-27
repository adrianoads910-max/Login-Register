// backend/routes/adminRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
import { getAllUsers, deleteUser, updateUserByAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.put("/users/:id", verifyToken, verifyAdmin, updateUserByAdmin);

export default router;
