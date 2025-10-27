
---

# 🔐 Login & Register App

Aplicação completa de autenticação com **React + Firebase + Node.js + SQLite**,
permitindo **cadastro, login tradicional e login social (Google e GitHub)** com painel administrativo.

---

## 🚀 Tecnologias utilizadas

### 🖥️ Frontend

* [React.js](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Firebase Auth](https://firebase.google.com/)
* React Router DOM

### ⚙️ Backend

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [SQLite](https://www.sqlite.org/)
* [JWT (JSON Web Token)](https://jwt.io/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

---

## 📂 Estrutura do projeto

```
📦 Login-Register/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── adminRoutes.js
│   ├── database.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── firebase.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── .env
│
└── README.md
```

---

## ⚡ Como rodar o projeto

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/adrianoads910-max/Login-Register.git
cd Login-Register
```

---

### 🧩 2. Configure o backend

```bash
cd backend
npm install
```

Crie um arquivo **.env** com as variáveis:

```env
PORT=5000
JWT_SECRET=meusegredo123
```

Inicie o servidor:

```bash
npm run dev
```

Servidor ativo em: [http://localhost:5000](http://localhost:5000)

---

### 💻 3. Configure o frontend

```bash
cd frontend
npm install
```

Crie o arquivo `.env` com as chaves do Firebase:

```env
VITE_FIREBASE_API_KEY=SEU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=SEU_SENDER_ID
VITE_FIREBASE_APP_ID=SEU_APP_ID
```

Execute o frontend:

```bash
npm run dev
```

Frontend disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Funcionalidades

✅ Registro com nome, apelido, e-mail e senha
✅ Login com e-mail e senha
✅ Login com **Google** e **GitHub**
✅ Perfil do usuário (com atualização de dados e foto)
✅ Painel de administração (`/admin`)
✅ Tokens JWT com verificação no backend
✅ Banco SQLite local (sem necessidade de configuração extra)

---

## 🧠 Estrutura do backend (principais rotas)

| Método | Rota                     | Descrição                           |
| ------ | ------------------------ | ----------------------------------- |
| POST   | `/api/auth/register`     | Cria novo usuário                   |
| POST   | `/api/auth/login`        | Login com e-mail e senha            |
| POST   | `/api/auth/social-login` | Login via Google/GitHub             |
| GET    | `/api/auth/me`           | Retorna dados do usuário logado     |
| PUT    | `/api/auth/profile`      | Atualiza nome, apelido, senha, foto |
| PUT    | `/api/auth/photo`        | Atualiza apenas a foto              |
| GET    | `/api/admin/users`       | Lista todos os usuários (admin)     |
| DELETE | `/api/admin/users/:id`   | Remove um usuário (admin)           |

---

## 🧰 Scripts úteis

### Backend

```bash
npm run dev   # Inicia com nodemon
```

### Frontend

```bash
npm run dev   # Inicia o servidor Vite
npm run build # Gera build de produção
```

---

## 📸 Prints do projeto 

### 🔐 Login
![Tela Home](frontend/public/images/Semtítulo6.png)

### 🧍 Registro
![Tela de Registro](frontend/public/images/Semtítulo1.png)

### 👤 Perfil
![Tela de Perfil](frontend/public/images/Semtítulo4.png)

### 👤 Perfil ADM
![Tela de Perfil](frontend/public/images/Semtítulo2.png)

### 🛠️ Painel Admin
![Painel Admin](frontend/public/images/Semtítulo3.png)

### 🛠️ Painel Admin
![Painel Admin](frontend/public/images/Semtítulo6.png)

---

## 🧑‍💻 Autor

**Adriano ADS**
📧 [adrianoads910@gmailcom]
🌐 [https://github.com/adrianoads910-max](https://github.com/adrianoads910-max)

---

Quer que eu formate o README com **badges do GitHub (npm, React, Node, Firebase, SQLite)** e um **banner estilizado no topo** (como os repositórios populares)? Isso deixa o visual muito mais profissional.
