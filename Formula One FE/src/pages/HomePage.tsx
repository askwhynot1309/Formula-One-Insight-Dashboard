import React from "react";
import { useAuth } from "../context/AuthContext";
import { Card } from "antd";

const HomePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <Card>
      <h2>Welcome{user ? `, ${user.username}` : ""}!</h2>
      {/* Main dashboard content */}
    </Card>
  );
};

export default HomePage; 