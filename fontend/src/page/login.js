import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const history = useHistory();
  const openNotificationWithIcon = (type, text) => {
    notification[type]({
      message: text,
    });
  };
  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      const JWT = await axios.post("http://localhost:8000/api/login", {
        email: values.email,
        password: values.password,
      });
      openNotificationWithIcon("success", "Login success");
      console.log(JWT.data);
      localStorage.setItem("TOKEN", JWT.data.token);
      localStorage.setItem("NAME", JWT.data.name);
      history.push("/");
    } catch (err) {
      openNotificationWithIcon("error", "Email or Password is Wrong");
    }
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Login;
