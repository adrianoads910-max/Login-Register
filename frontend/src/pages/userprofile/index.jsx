import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; 

export const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    photo: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Logout completo (frontend + firebase)
const handleLogout = () => {
  // Logout do Firebase (se usou Google ou GitHub)
  signOut(auth)
    .then(() => {
      // Remover tudo local
      localStorage.removeItem("token");       // token do backend
      localStorage.removeItem("userPhoto");   // foto do Firebase
      localStorage.removeItem("userName");    // nome do Firebase
      localStorage.removeItem("userEmail");   // email do Firebase
      
      navigate("/login");
    })
    .catch((error) => {
      console.error("Erro ao deslogar do Firebase", error);
    });
};

  // ✅ Buscar dados ao carregar
useEffect(() => {
  const token = localStorage.getItem("token");

  // 👇 Dados sociais salvos no localStorage (Google/GitHub)
  const socialPhoto = localStorage.getItem("userPhoto");
  const socialName = localStorage.getItem("userName");
  const socialEmail = localStorage.getItem("userEmail");

  // ✅ Se usuário veio de login social (Google/GitHub)
  if (socialName && socialPhoto) {
    setUser({
      name: socialName,
      nickname: socialName.split(" ")[0],
      email: socialEmail || "",
      photo: socialPhoto,
      password: "",
    });
    return;
  }

  // ✅ Se não há token nem login social → volta pro login
  if (!token) {
    navigate("/login");
    return;
  }

  // ✅ Busca perfil do backend
  fetch("http://localhost:5000/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.user) {
        setUser({
          ...data.user,
          password: "",
          photo: data.user.photo || "/default-profile.jpg", // <-- agora vem do backend
        });
      } else {
        navigate("/login");
      }
    })
    .catch(() => navigate("/login"));
}, [navigate]);


  // ✅ Atualizar perfil (nome, nickname, senha)
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
        photo: user.photo,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("✅ Perfil atualizado!");
      setUser((prev) => ({ ...prev, password: "" }));
    } else {
      setMessage(data.message || "❌ Erro ao atualizar.");
    }
  };

 const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    const base64Photo = reader.result;
    setUser((prev) => ({ ...prev, photo: base64Photo })); // Atualiza na tela

    const token = localStorage.getItem("token");

    // Enviar para backend
    await fetch("http://localhost:5000/api/auth/photo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ photo: base64Photo }),
    });

    // Salvar também no localStorage (opcional)
    localStorage.setItem("userPhoto", base64Photo);
  };
  reader.readAsDataURL(file);
};


  // ⚠ Feedback carregando
  if (!user.name && !user.email) {
    return <p className="text-center text-lg mt-10">Carregando dados...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('./banner4.png')" }}
    >
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row lg:divide-x divide-gray-300">
        
        {/* ESQUERDA - FOTO / INFOS */}
        <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center space-y-6 text-center">
          <Link to="/" className="text-xl p-2 text-gray-700 hover:text-blue-600 transition">
            <i className="fa-solid fa-house-user"></i>
          </Link>

          <img
            src={user.photo || "/default-profile.jpg"}
            alt="Foto do usuário"
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />

          {/* Botão de mudar foto */}
          <label className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
            Alterar foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>


          <h2 className="text-2xl font-bold text-gray-800">
            Olá, {user.name || "Usuário"}
          </h2>
        </div>

        {/* DIREITA - FORMULÁRIO */}
        <div className="lg:w-1/2 p-6">
          <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">Seus dados</h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Nome:</label>
              <input type="text" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-2 border border-gray-600 bg-gray-100 rounded-md" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Apelido:</label>
              <input type="text" name="nickname" value={user.nickname} onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                className="w-full p-2 border border-gray-600 bg-gray-100 rounded-md" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">E-mail:</label>
              <input type="email" name="email" value={user.email} readOnly
                className="w-full p-2 border border-gray-600 bg-gray-100 rounded-md cursor-not-allowed" />
            </div>

            <div>
              <label className="block text-sm text-gray-700">Nova senha:</label>
              <input type="password" name="password" value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full p-2 border border-gray-600 bg-gray-100 rounded-md"
                placeholder="Digite nova senha (opcional)" />
            </div>

            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition">
              Salvar
            </button>

            <button type="button" onClick={handleLogout} className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition mt-3">
              Sair
            </button>
            {user.isAdmin === 1 && (
            <Link
              to="/admin/users"
              className="w-full py-2 mt-4 bg-purple-600 text-white rounded-md hover:bg-purple-800 transition shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-users-gear"></i> Gestão de Usuários
            </Link>
          )}


            {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
