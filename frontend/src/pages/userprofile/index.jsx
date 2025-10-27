import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Carregar dados do usuário logado ao entrar na página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({ ...data.user, password: "" }); // senha não vem do backend
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, []);

  // ✅ Atualização de campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // ✅ Salvar alterações no backend
  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        nickname: user.nickname,
        password: user.password !== "" ? user.password : undefined,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("✅ Alterações salvas com sucesso!");
      setUser((prevUser) => ({ ...prevUser, password: "" }));
    } else {
      setMessage(data.message || "❌ Erro ao salvar.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/banner4.png')" }}
    >
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">
        
        {/* Esquerda */}
        <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center space-y-6 text-center">
          <Link
            to="/"
            className="text-xl p-2 text-gray-700 hover:text-blue-600 transition"
          >
            <i className="fa-solid fa-house-user"></i>
          </Link>

          <img
            src="/default-profile.jpg"
            alt="Foto do usuário"
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Olá, {user.name || "Usuário"}
            </h2>
            <p className="text-gray-600">Gerencie suas informações pessoais abaixo.</p>
          </div>
        </div>

        {/* Direita - Formulário */}
        <div className="lg:w-1/2 p-6 mt-6 lg:mt-0">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 text-center">Seus dados pessoais</h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome completo:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Apelido:</label>
              <input
                type="text"
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">E-mail:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nova senha (opcional):</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-100"
                placeholder="Digite nova senha se quiser trocar"
              />
            </div>

            <div className="flex justify-between space-x-4 mt-6">
              <button type="submit" className="w-1/2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition shadow-md flex items-center justify-center gap-2">
                <i className="fas fa-save"></i> Salvar
              </button>

              <Link to="/" className="w-1/2 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition shadow-md flex items-center justify-center gap-2">
                <i className="fas fa-times"></i> Cancelar
              </Link>
            </div>

            {message && <p className="text-center text-sm text-red-500 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
