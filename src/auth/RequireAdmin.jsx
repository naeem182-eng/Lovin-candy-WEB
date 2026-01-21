import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const isAdminRole = (role) => role === "ADMIN" || role === "SUPER ADMIN";

export default function RequireAdmin() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-6">Loading...</div>;

 
  if (!isAdminRole(user?.role)) return <Navigate to="/" replace />;

  return <Outlet />;
}
