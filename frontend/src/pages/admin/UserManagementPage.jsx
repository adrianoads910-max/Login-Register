import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Estados do modal de edição
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    nickname: "",
    email: "",
  });

  // 1️⃣ Buscar usuários
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
  };

  // 2️⃣ Abrir modal de edição
  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    });
  };

  // Atualiza campos digitados no modal
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // 3️⃣ Salvar alterações
  const handleEditSave = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/admin/users/${editingUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      }
    );

    if (response.ok) {
      setMessage("✅ Usuário atualizado com sucesso!");
      setEditingUser(null);
      fetchUsers();
    } else {
      setMessage("❌ Erro ao atualizar usuário!");
    }
  };

  // 4️⃣ Deletar usuário
  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessage("❌ Usuário excluído!");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/banner5.jpg')" }}>

  
    <div className="p-8" >
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-2xl text-gray-700 hover:text-blue-600">
          <i className="fa-solid fa-house-user"></i>
        </Link>
        <h1 className="text-2xl font-bold">👥 Gestão de Usuários</h1>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* ✅ Modal de edição */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">✏ Editar Usuário</h2>

            <label className="block mb-2">Nome:</label>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">Apelido:</label>
            <input
              type="text"
              name="nickname"
              value={editForm.nickname}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <label className="block mb-2">E-mail:</label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvar
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Tabela */}
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Apelido</th>
            <th className="p-2 border">E-mail</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead >
        <tbody className="bg-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">
                <img
                  src={user.photo || "/default-profile.jpg"}
                  className="w-12 h-12 rounded-full mx-auto"
                  alt="foto"
                />
              </td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.nickname}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </section>
  );
};
