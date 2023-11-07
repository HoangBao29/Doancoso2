import { Button, Form, Input, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../src/api/useUsers";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const formRef = useRef(null);
  const { getUser } = useUsers();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const onFinish = (values) => {
    getUser(values.username, values.password).then((res) => {
      if (res) {
        localStorage.setItem("token", res);
        navigate("/admin");
        window.location.reload();
      } else {
        message.error("Nhập sai tên đăng nhập hoặc mật khẩu", 1);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {};

  const onCancel = () => {
    formRef.current.resetFields();
    handleCancel();
  };

  return (
    <div className="wrapper-register">
      <Modal
        title="Đăng nhập"
        open={isModalOpen}
        onCancel={onCancel}
        centered
        footer={null}
      >
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Nhập tên đăng nhập!",
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item className="button">
            <Button type="primary" htmlType="submit" className="button-create">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
