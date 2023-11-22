import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";

const Introduce = () => {
  const [form] = Form.useForm();

  const { Title } = Typography;
  const [auth, setAuth] = useState();
  const onFinish = () => {};
  const onFinishFailed = () => {};
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("auth")));
  }, []);
  console.log(auth);
  form.setFieldsValue({
    name: auth?.name,
    email: auth?.email,
    password: auth?.password,
    phone: auth?.phone,
    address: auth?.address,
  });
  return (
    <div className="wrapper-introduce">
      <Title>Trang cá nhân</Title>
      <Row>
        <Col>
          {/* <img src={require(`../../assets/images/${auth?.avatar}`)} alt="anh" /> */}
        </Col>
        <Col>
          <Form
            name="register"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            ref={form}
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
              {/* <input
                onChange={handleAvatar}
                type="file"
                id="myFile"
                name="filename"
                value={file}
              ></input> */}
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
        </Col>
      </Row>
    </div>
  );
};

export default Introduce;
