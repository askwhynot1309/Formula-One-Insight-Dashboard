import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/home" />;

  return <Dashboard />;
};

export default AdminPage; 