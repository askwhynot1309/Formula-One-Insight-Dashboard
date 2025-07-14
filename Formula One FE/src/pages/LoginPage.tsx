import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { UserName: string; Password: string }) => {
    console.log("UserName:", values.UserName);
    console.log("Password:", values.Password);

    setLoading(true);
    try {
      const res = await api.post("/auth/login", values);
      login(res.data.token);
      message.success("Login successful!");
      if (res.data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "80px auto" }}>
      <Form onFinish={onFinish}>
        <Form.Item name="UserName" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginPage;