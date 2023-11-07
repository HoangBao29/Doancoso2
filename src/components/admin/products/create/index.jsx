import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProduct } from "../../../../api/useProduct";

const Create = ({ isModalOpen, handleCancel }) => {
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const formRef = useRef(null);
  const { postProduct, uploadImage, getImageUrl } = useProduct();

  const onFinish = (values) => {
    values.id = uuidv4();
    uploadImage(file).then((res) => {
      getImageUrl(res?.data).then((res) => {
        values.image = res?.data?.publicUrl;
        postProduct(values).then((res) => {
          message.success("Thêm sản phẩm thành công", 1);
          handleOk();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        });
      });
    });
  };

  const onFinishFailed = (errorInfo) => {};

  const onCancel = () => {
    formRef.current.resetFields();
    handleCancel();
  };

  const handleOk = () => {
    handleCancel();
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  };

  return (
    <div className="wrapper-register">
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        footer={null}
      >
        <Form
          name="Create"
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
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="type"
            rules={[
              {
                required: true,
                message: "Chọn loại sản phẩm!",
              },
            ]}
          >
            <Select
              placeholder="Chọn loại sản phẩm"
              value={type}
              onChange={(e) => {
                setType(e);
              }}
              options={[
                {
                  value: "Máy phát điện",
                  label: "Máy phát điện",
                },
                {
                  value: "Máy nén khí",
                  label: "Máy nén khí",
                },
                {
                  value: "Máy phát hàn",
                  label: "Máy phát hàn",
                },
                {
                  value: "Xe nâng",
                  label: "Xe nâng",
                },
                {
                  value: "Động cơ nổ khác",
                  label: "Động cơ nổ khác",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="brand"
            rules={[
              {
                required: true,
                message: "Nhập thương hiệu sản phẩm!",
              },
            ]}
          >
            <Input placeholder="Thương hiệu sản phẩm" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Nhập giá sản phẩm!",
              },
            ]}
          >
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Nhập thông tin thêm!",
              },
            ]}
          >
            <Input placeholder="Thông tin thêm" />
          </Form.Item>

          <Form.Item
            label="Chọn ảnh sản phẩm"
            name="image"
            rules={[
              {
                required: true,
                message: "Nhập thông tin thêm!",
              },
            ]}
          >
            <input
              onChange={handleFileChange}
              type="file"
              id="myFile"
              name="filename"
            ></input>
          </Form.Item>

          <Form.Item className="button">
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Create;
