import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider, signInWithPopup } from "../../firebase";

const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Login normal com backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Carregando...");

    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("isAdmin", data.user.isAdmin);
      setMessage("");
      navigate("/profile");
    } else {
      setMessage(data.message || "Erro ao fazer login!");
    }
  };

  // ✅ Login com Google (via backend)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await fetch("http://localhost:5000/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          provider: "google",
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userPhoto", data.user.photo);
        localStorage.setItem("isAdmin", data.user.isAdmin);
        setMessage("✅ Login com Google realizado!");
        navigate("/profile");
      } else {
        setMessage(data.message || "❌ Erro ao autenticar com Google.");
      }
    } catch (error) {
      console.error("❌ Erro no login com Google:", error);
      setMessage("❌ Erro ao autenticar com Google.");
    }
  };

  // ✅ Login com GitHub (via backend)
  const loginWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const response = await fetch("http://localhost:5000/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName || "Usuário GitHub",
          email: user.email,
          photo: user.photoURL,
          provider: "github",
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userPhoto", data.user.photo);
        localStorage.setItem("isAdmin", data.user.isAdmin);
        setMessage("✅ Login com GitHub realizado!");
        navigate("/profile");
      } else {
        setMessage(data.message || "❌ Erro ao autenticar com GitHub.");
      }
    } catch (error) {
      console.error("❌ Erro no login com GitHub:", error);
      setMessage("❌ Erro ao autenticar com GitHub.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/banner2.jpg')" }}
    >
      <div className="bg-[#ffffffcc] rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">
        {/* Social */}
        <div className="lg:w-1/2 p-4 flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="text-3xl p-2 text-gray-700 hover:text-blue-600 transition">
            <i className="fa-solid fa-house-user"></i>
          </Link>

          <h3 className="text-lg font-semibold text-gray-700">Conecte-se:</h3>

          <button
            onClick={loginWithGoogle}
            className="w-full lg:w-3/4 py-2 px-4 bg-red-300 hover:bg-red-600 text-black hover:text-white rounded-md flex items-center justify-center gap-2"
          >
            <i className="fab fa-google"></i> Continuar com Google
          </button>

          <button
            onClick={loginWithGitHub}
            className="w-full lg:w-3/4 py-2 px-4 bg-gray-400 hover:bg-gray-600 text-black hover:text-white rounded-md flex items-center justify-center gap-2"
          >
            <i className="fab fa-github"></i> Continuar com GitHub
          </button>
        </div>

        {/* Login com e-mail */}
        <div className="lg:w-1/2 p-4">
          <h3 className="text-lg font-semibold text-gray-700 text-center">Login com e-mail</h3>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-2 bg-gray-200 border border-gray-800 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2 bg-gray-200 border border-gray-800 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white hover:bg-blue-900 rounded-md"
            >
              Login
            </button>

            {message && <p className="text-center text-sm text-red-500">{message}</p>}
          </form>

          <p className="text-center mt-4 text-sm">
            Não tem conta?{" "}
            <Link to="/register" className="text-blue-600 hover:text-red-400">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
