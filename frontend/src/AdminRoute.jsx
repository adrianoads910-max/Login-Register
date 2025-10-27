import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "1"; // ou "true", conforme backend

  if (!token) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
};
