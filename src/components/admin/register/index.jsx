import { Button, Form, Input, Modal, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../../../src/api/useUsers";
import axios from "axios";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const formRef = useRef(null);
  const { postUser } = useUsers();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const onFinish = (values) => {
    values.country = "Việt Nam";
    values.level = 0;
    values.avatar = avatar;
    console.log(values);
    //gui api user
    postUser(values).then((res) => {
      axios.post("http://localhost/laravel8/public/api/register", values);
      if (res?.status === 200 || res?.status === 500) {
        message.success("Đăng kí thành công!", 3);
        navigate("/login");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {};

  const onCancel = () => {
    formRef.current.resetFields();
    handleCancel();
  };

  const handleAvatar = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result); //de gui qua api
      setFile(file[0]); //de luu thong tin file
    };
    reader.readAsDataURL(file[0]);
  };

  return (
    <div className="wrapper-register">
      <Modal
        title="Đăng ký"
        open={isModalOpen}
        onCancel={onCancel}
        centered
        footer={null}
      >
        <Form
          name="register"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            name="name"
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
                message: "Nhập password",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ",
              },
            ]}
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>

          <Form.Item
            name="avatar"
            rules={[
              {
                required: true,
                message: "Thêm ảnh đại diện",
              },
            ]}
          >
            <input
              onChange={handleAvatar}
              type="file"
              id="myFile"
              name="filename"
              value={file}
            ></input>
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
                Đăng ký
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
