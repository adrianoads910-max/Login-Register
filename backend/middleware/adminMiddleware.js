import db from "../database.js";

export const verifyAdmin = (req, res, next) => {
  const user = db.prepare("SELECT isAdmin FROM users WHERE id = ?").get(req.userId);

  if (!user || user.isAdmin !== 1) {
    return res.status(403).json({ message: "Acesso negado: somente administradores." });
  }

  next();
};
