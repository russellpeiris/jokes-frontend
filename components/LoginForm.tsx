"use client";

import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLogin } from "../api/login";
import { useAuth } from "../context/auth";
import { LoginValues } from "../interfaces";
import Button from "./Button";

const LoginForm = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const { login, data: loginResponse, error: loginError, loading } = useLogin();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginValues) => {
    await login(values.email, values.password);
  };
  useEffect(() => {
    if (loginResponse) {
      setIsAuthenticated(true);
      localStorage.setItem("token", loginResponse.token);
      router.push("/moderate-jokes");
    } else if (loginError) {
      form.setFields([
        {
          name: "password",
          errors: [loginError],
        },
      ]);
    }
  }, [loginResponse, loginError, setIsAuthenticated, router, form]);

  return (
    <Form
      form={form}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 400,
        width: "100%",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
      }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email!" }]}
      >
        <Input type="email" placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <Form.Item>
        <Button type="submit" loading={loading}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
