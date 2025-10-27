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


export const googleAuth = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ message: "Dados do Google inválidos" });
    }

    // Verifica se usuário já existe
    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      // Se não existe → cria usuário
      const stmt = db.prepare("INSERT INTO users (name, nickname, email, password) VALUES (?, ?, ?, ?)");
      stmt.run(name, name.split(" ")[0], email, googleId); // senha recebe UID do Google só para preencher
      user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    }

    // Gera token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login com Google bem-sucedido!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no login Google", error });
  }
};

export const socialAuth = (req, res) => {
  try {
    const { email, name, socialId, provider } = req.body;

    if (!email || !socialId) {
      return res.status(400).json({ message: "Dados inválidos do provedor social." });
    }

    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user) {
      db.prepare(`
        INSERT INTO users (name, nickname, email, password)
        VALUES (?, ?, ?, ?)
      `).run(name, name.split(" ")[0], email, socialId);

      user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    }

    const token = jwt.sign(
      { id: user.id, provider },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login via " + provider + " realizado!",
      token,
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email,
        provider
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro login social", error });
  }
};
