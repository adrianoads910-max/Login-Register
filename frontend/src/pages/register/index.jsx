import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem!");
      return;
    }

    // Chamada para backend
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, nickname, email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      setMessage("✅ Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(data.message || "❌ Erro no cadastro!");
    }
  };

  return (
    <main>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/banner3.jpg')" }}
      >
        {/* Caixa branca com opacidade */}
        <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">

          {/* Registro Social */}
          <div className="lg:w-1/2 p-4 flex flex-col items-center justify-center space-y-4">
            <Link to="/" className="text-3xl p-2 text-gray-700 hover:text-blue-600 transition">
              <i className="fa-solid fa-house-user"></i>
            </Link>

            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Conecte-se:
            </h3>

            <button className="w-full lg:w-3/4 py-2 px-2 text-md rounded-md bg-red-300 text-slate-950 hover:bg-red-600 hover:text-white transition shadow-md flex items-center justify-center gap-2">
              <i className="fab fa-google"></i> Cadastrar com Google
            </button>

            <button className="w-full lg:w-3/4 py-2 px-2 text-md rounded-md bg-blue-300 text-slate-950 hover:bg-blue-600 hover:text-white transition shadow-md flex items-center justify-center gap-2">
              <i className="fab fa-facebook-f"></i> Cadastrar com Facebook
            </button>

            <button className="w-full lg:w-3/4 py-2 px-2 text-md rounded-md bg-slate-400 text-slate-950 hover:bg-slate-600 hover:text-white transition shadow-md flex items-center justify-center gap-2">
              <i className="fab fa-github"></i> Cadastrar com GitHub
            </button>
          </div>

          {/* Registro com Email */}
          <div className="lg:w-1/2 p-4 mt-6 lg:mt-0">
            <div className="flex items-center justify-center my-4 lg:hidden">
              <span className="text-gray-400">ou</span>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Cadastre-se com e-mail:
            </h3>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-200"
                  placeholder="Seu Nome Completo"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Apelido (Username):</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-200"
                  placeholder="Escolha um apelido"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">E-mail:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-200"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Senha:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Confirme Senha:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-700 rounded-md bg-gray-200"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-lg font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-950 transition shadow-md mt-6"
              >
                Cadastrar
              </button>

              {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
            </form>

            <div className="text-center mt-6 text-sm">
              <p className="text-gray-600">
                Já tem conta?{" "}
                <Link to="/login" className="text-blue-600 hover:text-red-500 font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
