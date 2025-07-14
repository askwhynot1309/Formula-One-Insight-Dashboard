import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  if (user === null) return <div>Loading...</div>; // Wait for user to be set
  return <Dashboard />;
};

export default AdminPage; 