import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  // Se não for admin, nega acesso
  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
