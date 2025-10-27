import db from "../database.js";

// 📌 Retornar todos os usuários cadastrados

export const getAllUsers = (req, res) => {
  try {
    const users = db.prepare("SELECT id, name, nickname, email, photo, isAdmin FROM users").all();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

// ✅ Deletar um usuário
export const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
};

// ✅ Atualizar nome/apelido pelo admin
export const updateUserByAdmin = (req, res) => {
  try {
    const { name, nickname, isAdmin } = req.body;
    const userId = req.params.id;

    db.prepare("UPDATE users SET name = ?, nickname = ?, isAdmin = ? WHERE id = ?")
      .run(name, nickname, isAdmin ? 1 : 0, userId);

    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};