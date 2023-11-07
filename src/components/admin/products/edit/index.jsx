import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../../../../api/useProduct";

const Edit = ({ isModalOpen, handleOk, handleCancel, id }) => {
  const [file, setFile] = useState();
  const [anh, setAnh] = useState("");
  const formRef = useRef(null);
  const {
    updateProduct,
    getProductById,
    uploadImage,
    getImageUrl,
    deleteImage,
  } = useProduct();

  useEffect(() => {
    if (id) {
      getProductById(id).then((res) => {
        setAnh(res?.data?.[0]?.image);
        formRef.current.setFieldsValue({
          name: res?.data?.[0]?.name,
          type: res?.data?.[0]?.type,
          brand: res?.data?.[0]?.brand,
          price: res?.data?.[0]?.price,
          description: res?.data?.[0]?.description,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = (values) => {
    uploadImage(file).then((res) => {
      getImageUrl(res?.data).then((res) => {
        values.image = res?.data?.publicUrl;
        updateProduct(values, id).then((res) => {
          deleteImage(anh);
          message.success("Cập nhật sản phẩm thành công", 1);
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

  const handleFileChange = (e) => {
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      setFile(file[0]);
    };
    reader.readAsDataURL(file[0]);
  };

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  };

  return (
    <div className="wrapper-register">
      <Modal
        title="Sửa sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        footer={null}
      >
        <Form
          {...layout}
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
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input placeholder="Tên" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại"
            rules={[
              {
                required: true,
                message: "Chọn loại sản phẩm!",
              },
            ]}
          >
            <Select
              placeholder="Chọn loại sản phẩm"
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
            label="Thương hiệu"
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
            label="Giá"
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
            label="Thông tin"
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
            name="image"
            label="Ảnh"
            rules={[
              {
                required: true,
                message: "Vui lòng tải ảnh lên!",
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

export default Edit;
