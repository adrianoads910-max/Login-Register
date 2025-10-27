import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Função para chamar o backend
const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Carregando...");

    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage("");
      navigate("/profile"); // Redireciona para perfil
    } else {
      setMessage(data.message || "Erro ao fazer login!");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/banner2.jpg')" }}>

      <div className="bg-[#ffffffcc] rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">

        {/* Lado Esquerdo - Social Login */}
        <div className="lg:w-1/2 p-4 flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="text-3xl p-2 text-gray-700 hover:text-blue-600 transition">
            <i className="fa-solid fa-house-user"></i>
          </Link>

          <h3 className="text-lg font-semibold text-gray-700 text-center">Conecte-se:</h3>

          <button className="w-full lg:w-3/4 py-2 px-4 text-md rounded-md bg-red-300 hover:bg-red-600 text-slate-950 hover:text-white flex items-center justify-center gap-2">
            <i className="fab fa-google"></i> Continue com Google
          </button>

          <button className="w-full lg:w-3/4 py-2 px-4 text-md rounded-md bg-blue-300 hover:bg-blue-600 text-slate-950 hover:text-white flex items-center justify-center gap-2">
            <i className="fab fa-facebook-f"></i> Continue com Facebook
          </button>

          <button className="w-full lg:w-3/4 py-2 px-4 text-md rounded-md bg-slate-400 hover:bg-slate-600 text-slate-950 hover:text-white flex items-center justify-center gap-2">
            <i className="fab fa-github"></i> Continue com GitHub
          </button>
        </div>

        {/* Lado Direito - Login com Email */}
        <div className="lg:w-1/2 p-4 mt-6 lg:mt-0">
          <div className="flex items-center justify-center my-4 lg:hidden">
            <span className="text-gray-400">ou</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 text-center">Faça login com e-mail:</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-800 rounded-md bg-gray-200"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-800 rounded-md bg-gray-200"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-gray-600">Lembrar senha</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-red-400 transition">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="w-full py-2 text-lg font-semibold rounded-md bg-blue-600 hover:bg-blue-950 text-white transition shadow-md">
              Login
            </button>

            {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
          </form>

          <div className="text-center mt-6 text-sm">
            <p className="text-gray-600">
              Não tem conta?{" "}
              <Link to="/register" className="text-blue-600 hover:text-red-400 font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
