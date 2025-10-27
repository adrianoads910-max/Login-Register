import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token não enviado!" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer token..."

  if (!token) {
    return res.status(401).json({ message: "Token inválido!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado!" });
  }
};
