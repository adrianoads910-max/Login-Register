// backend/fix_database.js
import db from "./database.js"; // Usa o mesmo banco do projeto
import bcrypt from "bcrypt";

(async () => {
  try {
    // ✅ Verifica se a coluna isAdmin existe
    const tableInfo = db.prepare(`PRAGMA table_info(users);`).all();
    const hasIsAdmin = tableInfo.some(col => col.name === "isAdmin");

    // ✅ Se não existir, adiciona a coluna
    if (!hasIsAdmin) {
      db.prepare(`ALTER TABLE users ADD COLUMN isAdmin INTEGER DEFAULT 0;`).run();
      console.log("✅ Coluna 'isAdmin' adicionada com sucesso!");
    } else {
      console.log("✅ A coluna 'isAdmin' já existe.");
    }

    // ✅ Criar usuário admin
    const email = "admin@teste.com";
    const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      db.prepare(`
        INSERT INTO users (name, nickname, email, password, isAdmin)
        VALUES (?, ?, ?, ?, 1)
      `).run("Administrador", "admin", email, hashedPassword);

      console.log("✅ Usuário admin criado: admin@teste.com / 123456");
    } else {
      db.prepare("UPDATE users SET isAdmin = 1 WHERE email = ?").run(email);
      console.log("✅ Usuário já existia — agora é ADMIN!");
    }

    console.log("🎉 Tudo pronto!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro:", error);
    process.exit(1);
  }
})();
