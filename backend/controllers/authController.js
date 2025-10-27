import db from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ============================================================
// ✅ Registro de usuário
// ============================================================
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

// ============================================================
// ✅ Login com e-mail e senha
// ============================================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login OK!",
      token,
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no login", error });
  }
};

// ============================================================
// ✅ Perfil autenticado
// ============================================================
export const getProfile = (req, res) => {
  try {
    const user = db
      .prepare("SELECT id, name, nickname, email, photo, isAdmin FROM users WHERE id = ?")
      .get(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar perfil", error });
  }
};

// ============================================================
// ✅ Atualizar perfil
// ============================================================
export const updateProfile = async (req, res) => {
  try {
    const { name, nickname, password, photo } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const updatedName = name || user.name;
    const updatedNickname = nickname || user.nickname;
    let updatedPassword = user.password;
    if (password) updatedPassword = await bcrypt.hash(password, 10);
    const updatedPhoto = photo || user.photo;

    db.prepare(`
      UPDATE users 
      SET name = ?, nickname = ?, password = ?, photo = ?
      WHERE id = ?
    `).run(updatedName, updatedNickname, updatedPassword, updatedPhoto, req.userId);

    res.json({
      message: "Perfil atualizado!",
      user: {
        id: user.id,
        name: updatedName,
        nickname: updatedNickname,
        email: user.email,
        photo: updatedPhoto
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar perfil", error });
  }
};

// ============================================================
// ✅ Login social (Google / GitHub / outros)
// ============================================================
export const socialLogin = async (req, res) => {
  try {
    const { name, email, photo, provider } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-mail obrigatório" });
    }

    // Verifica se já existe
    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    // Cria novo usuário, se não existir
    if (!user) {
      db.prepare(`
        INSERT INTO users (name, nickname, email, photo, password)
        VALUES (?, ?, ?, ?, ?)
      `).run(name, name.split(" ")[0], email, photo, provider + "_social");

      user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: `Login via ${provider} realizado!`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
        photo: user.photo,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Erro login social:", error);
    return res.status(500).json({ message: "Erro login social", error });
  }
};

// ============================================================
// ✅ Atualizar foto de perfil
// ============================================================
export const updatePhoto = (req, res) => {
  try {
    const { photo } = req.body;
    if (!photo) return res.status(400).json({ message: "Nenhuma foto enviada!" });

    db.prepare("UPDATE users SET photo = ? WHERE id = ?").run(photo, req.userId);
    return res.json({ message: "✅ Foto atualizada com sucesso!", photo });
  } catch (error) {
    console.error("❌ Erro updatePhoto:", error);
    return res.status(500).json({ message: "Erro ao atualizar foto", error });
  }
};
