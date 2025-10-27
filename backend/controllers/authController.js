import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Registro de usuário
export const registerUser = async (req, res) => {
  try {
    const { name, nickname, email, password } = req.body;

    const userExists = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (userExists) return res.status(400).json({ message: "E-mail já registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare(`
      INSERT INTO users (name, nickname, email, password)
      VALUES (?, ?, ?, ?);
    `).run(name, nickname, email, hashedPassword);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};

// ✅ Login e geração de token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // ✅ Remover a senha do retorno
    const { password: _, ...safeUser } = user;

    res.json({ message: "Login OK!", token, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: "Erro no login", error });
  }
};

// ✅ Buscar dados do usuário autenticado (/me)
export const getProfile = (req, res) => {
  try {
    const user = db.prepare("SELECT id, name, nickname, email, created_at FROM users WHERE id = ?").get(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao carregar perfil", error });
  }
};

// ✅ Atualizar dados do perfil
export const updateProfile = async (req, res) => {
  try {
    const { name, nickname, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const updatedName = name || user.name;
    const updatedNickname = nickname || user.nickname;

    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    db.prepare(`
      UPDATE users 
      SET name = ?, nickname = ?, password = ?
      WHERE id = ?
    `).run(updatedName, updatedNickname, updatedPassword, req.userId);

    return res.json({
      message: "Perfil atualizado com sucesso!",
      user: {
        id: user.id,
        name: updatedName,
        nickname: updatedNickname,
        email: user.email,
        created_at: user.created_at
      }
    });

  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar perfil", error });
  }
};
