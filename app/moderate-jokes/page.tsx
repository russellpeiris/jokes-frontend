"use client";
import { Card, Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  useAddCategory,
  useApproveJoke,
  useGetCategories,
  useGetNextJoke,
  useRejectJoke,
} from "../../api/jokes";
import Button from "../../components/Button";
import { useAuth } from "../../context/auth";
import { Joke } from "../../interfaces";

const ModerateJokesPage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const { approveJoke } = useApproveJoke();
  const { rejectJoke } = useRejectJoke();
  const { getNextJoke, data: nextJoke } = useGetNextJoke();
  const { addCategory } = useAddCategory();
  const { getCategories, data: categories } = useGetCategories();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        getCategories();
        getNextJoke();
      }
    }
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (nextJoke) {
      form.setFieldsValue({
        joke: nextJoke.joke,
        category: nextJoke.category,
      });
    }
  }, [nextJoke, form]);

  const handleApprove = async () => {
    const joke: Joke = {
      jokeId: nextJoke.jokeId,
      joke: form.getFieldValue("joke"),
      category: form.getFieldValue("category"),
    };
    await approveJoke(joke.jokeId!, joke.joke, joke.category);
    handleGetNextJoke();
  };

  const handleReject = async () => {
    await rejectJoke(nextJoke.jokeId!);
    handleGetNextJoke();
  };

  const handleAddCategory = async () => {
    const newCategory = form.getFieldValue("newCategory");
    await addCategory(newCategory);
    setIsModalVisible(false);
  };

  const handleGetNextJoke = async () => {
    await getNextJoke();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
       <div style={{ position: "absolute", top: 10, right: 10 }}>
        <Button onClick={() => router.push('/jokes')}>Explore Jokes</Button>
      </div>
      <Card
        title="Moderate Jokes"
        style={{ width: 400 }}
        actions={[
          <Button key={"approve-button"} onClick={handleApprove}>
            Approve
          </Button>,
          <Button key={"reject-button"} onClick={handleReject}>
            Reject
          </Button>,
          <Button
            key={"add-category-button"}
            onClick={() => setIsModalVisible(true)}
          >
            Add Category
          </Button>,
        ]}
      >
        <Modal
          title="Add Category"
          open={isModalVisible}
          footer={[
            <Button key="add-category" onClick={handleAddCategory}>
              Add
            </Button>,
          ]}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form}>
            <FormItem label="New Category" name="newCategory">
              <Input />
            </FormItem>
          </Form>
        </Modal>
        <Form form={form}>
          <FormItem label="Joke" name="joke">
            <Input />
          </FormItem>
          <FormItem label="Category" name="category">
            <Select>
              {categories?.map((category: string) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default ModerateJokesPage;
