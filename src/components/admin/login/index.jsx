import { Button, Form, Input, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../src/api/useUsers";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const formRef = useRef(null);
  const { loginUser } = useUsers();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const onFinish = (values) => {
    loginUser(values).then((res) => {
      console.log(res);
      if (res?.data?.success === "success") {
        console.log("code vao day...........");
        if (res?.data?.Auth?.email === "baoadmin@gmail.com") {
          message.success("Đăng nhập thành công chế độ admin!");
          localStorage.setItem("token", res?.data?.token);
          localStorage.setItem("auth", res?.data?.Auth);
          navigate("/admin/product");
        } else {
          message.success("Đăng nhập thành công!");
          localStorage.setItem("token-client", res?.data?.token);
          console.log(res?.data?.Auth);
          localStorage.setItem("auth", JSON.stringify(res?.data?.Auth));
          navigate("/");
        }
        window.location.reload();
      }
    });
  };

  const onFinishFailed = (errorInfo) => {};

  const onCancel = () => {
    formRef.current.resetFields();
    handleCancel();
  };

  const handleRegister = () => {
    navigate("/register");
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
            name="email"
            rules={[
              {
                required: true,
                message: "Nhập email!",
              },
            ]}
          >
            <Input placeholder="Email" />
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

          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Form.Item className="button">
              <Button
                type="primary"
                htmlType="submit"
                className="button-create"
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Form.Item className="button">
              <Button
                onClick={handleRegister}
                type="primary"
                className="button-create"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
