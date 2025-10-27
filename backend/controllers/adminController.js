import db from "../database.js";

// 📌 Retornar todos os usuários cadastrados
export const getAllUsers = (req, res) => {
  try {
    const users = db.prepare("SELECT id, name, nickname, email, photo FROM users").all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

// 📌 Excluir usuário pelo ID
export const deleteUser = (req, res) => {
  try {
    db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
    res.json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir usuário", error });
  }
};

// 📌 Atualizar dados do usuário (admin)
export const updateUserByAdmin = (req, res) => {
  try {
    const { name, nickname, photo } = req.body;
    db.prepare(
      "UPDATE users SET name = ?, nickname = ?, photo = ? WHERE id = ?"
    ).run(name, nickname, photo, req.params.id);

    res.json({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};
