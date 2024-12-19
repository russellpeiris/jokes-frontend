"use client";
import { Card, Form, Input, Modal, Select, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useGetCategories,
  useGetNextModeratedJoke,
  useSubmitJoke,
} from "../../api/jokes";
import Button from "../../components/Button";
import { useAuth } from "../../context/auth";
import { Joke } from "../../interfaces";
import styles from "./page.module.css";

const { Option } = Select;
const { Text } = Typography;

const JokesPage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getCategories, data: categories } = useGetCategories();
  const { submitJoke } = useSubmitJoke();
  const { getNextModeratedJoke, data: nextJoke } = useGetNextModeratedJoke();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      category: nextJoke?.category,
      joke: nextJoke?.joke,
    });
  }, [form, nextJoke]);

  const handleGetJoke = async (category?: string) => {
    await getNextModeratedJoke(category);
  };

  const handleModerate = () => {
    if (isAuthenticated) {
      router.push("/moderate-jokes");
    } else {
      router.push("/login");
    }
  };

  const handleSubmitJoke = async () => {
    const joke: Joke = {
      joke: form.getFieldValue("newJoke"),
      category: form.getFieldValue("newCategory"),
    };
    await submitJoke(joke.joke, joke.category);
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topRight}>
        <Button onClick={() => handleModerate()}>Moderate</Button>
      </div>
      <Card
        title="Jokes Generator"
        className={styles.card}
        actions={[
          <Button
            key={"get-button"}
            onClick={() => handleGetJoke(form.getFieldValue("filterCategory"))}
          >
            Get Joke
          </Button>,
          <Button key={"new-button"} onClick={() => setIsModalVisible(true)}>
            New Joke
          </Button>,
        ]}
      >
        <Modal
          title="Submit Joke"
          open={isModalVisible}
          footer={[
            <Button key="submit-joke" onClick={handleSubmitJoke}>
              Submit
            </Button>,
          ]}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form}>
            <FormItem label="Category" name="newCategory">
              <Select>
                {categories?.map((category: string) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Joke" name="newJoke">
              <Input />
            </FormItem>
          </Form>
        </Modal>
        <Form form={form} initialValues={{ category: nextJoke?.category }}>
          <FormItem label="Select Category (Optional)" name="filterCategory">
            <Select>
              <Select.Option value={""}> </Select.Option>
              {categories?.map((category: string) => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label="Joke" name="joke">
            <Text>{nextJoke?.joke}</Text>
          </FormItem>
          <FormItem label="category" name="category">
            <Text>{nextJoke?.category}</Text>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default JokesPage;
