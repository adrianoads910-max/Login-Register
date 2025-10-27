import React, { useEffect, useState } from "react";

export const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // 📌 Buscar todos os usuários do backend
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
  };

  // 📌 Deletar usuário
  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessage("Usuário deletado!");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">👥 Gestão de Usuários</h1>

      {message && <p className="text-green-600">{message}</p>}

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Apelido</th>
            <th className="p-2 border">E-mail</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="p-2 border">
                <img
                  src={user.photo || "/default-profile.jpg"}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.nickname}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Editar</button>
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
  );
};
