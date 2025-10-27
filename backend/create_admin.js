// backend/create_admin.js
import db from "./database.js";
import bcrypt from "bcrypt";

(async () => {
  try {
    const email = "admin@teste.com";
    const plainPassword = "123456";
    const name = "Administrador";
    const nickname = "admin";

    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Verifica se já existe esse usuário
    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (existingUser) {
      console.log("⚠️ Usuário admin já existe:", existingUser.email);
    } else {
      db.prepare(`
        INSERT INTO users (name, nickname, email, password, isAdmin) 
        VALUES (?, ?, ?, ?, 1)
      `).run(name, nickname, email, hashedPassword);

      console.log("✅ Usuário admin criado com sucesso!");
      console.log("➡ Login: admin@teste.com");
      console.log("➡ Senha: 123456");
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao criar admin:", err);
    process.exit(1);
  }
})();
