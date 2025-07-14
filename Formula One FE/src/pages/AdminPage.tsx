import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card } from "antd";

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "Admin") return <Navigate to="/" />;

  return (
    <Card>
      <h2>Welcome, {user.username} (Admin)</h2>
      <p>This is the admin dashboard.</p>
      {/* Add admin features here */}
    </Card>
  );
};

export default AdminPage; 