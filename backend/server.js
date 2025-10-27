import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import "./database.js"; // Garante que o banco existe
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API com SQLite Online ✅"));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("🚀 Servidor rodando na porta 5000");
});
