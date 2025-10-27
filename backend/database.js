// backend/database.js
import Database from "better-sqlite3";

const db = new Database("users.db"); // Arquivo criado automaticamente

// Criar tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    photo TEXT,
    isAdmin INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("✅ Banco SQLite pronto!");

export default db;
