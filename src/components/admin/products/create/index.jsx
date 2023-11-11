import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProduct } from "../../../../api/useProduct";

const Create = ({ isModalOpen, handleCancel }) => {
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const formRef = useRef(null);
  const { postProduct, uploadImage, getImageUrl } = useProduct();

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (values) => {
    values.id = uuidv4();
    uploadImage(file, file1, file2).then((res) => {
      getImageUrl(res).then((res) => {
        if (res?.hasOwnProperty("url")) {
          values.image = res?.url?.data?.publicUrl;
        }
        if (res?.hasOwnProperty("url1")) {
          values.imagesub1 = res?.url1?.data?.publicUrl;
        }
        if (res?.hasOwnProperty("url2")) {
          values.imagesub2 = res?.url2?.data?.publicUrl;
        }
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

  const handleFileChange1 = (e) => {
    const file1 = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      setFile1(file1[0]);
    };
    reader.readAsDataURL(file1[0]);
  };

  const handleFileChange2 = (e) => {
    const file2 = e.target.files;
    let reader = new FileReader();
    reader.onload = () => {
      setFile2(file2[0]);
    };
    reader.readAsDataURL(file2[0]);
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
          {...layout}
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
                  value: "Linh kiện thiết bị điện tử",
                  label: "Linh kiện thiết bị điện tử",
                },
                {
                  value: "Động cơ nổ khác",
                  label: "Động cơ nổ khác",
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="brand">
            <Input placeholder="Thương hiệu sản phẩm" />
          </Form.Item>

          <Form.Item name="price">
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>

          <Form.Item name="watt">
            <Input placeholder="Công suất sản phẩm" />
          </Form.Item>

          <Form.Item name="engine">
            <Input placeholder="Động cơ sản phẩm" />
          </Form.Item>

          <Form.Item name="size">
            <Input placeholder="Kích thước sản phẩm" />
          </Form.Item>

          <Form.Item name="weight">
            <Input placeholder="Trọng lượng sản phẩm" />
          </Form.Item>

          <Form.Item name="description">
            <Input placeholder="Thông tin thêm" />
          </Form.Item>

          <Form.Item label="Chọn ảnh chính:" name="image">
            <input
              onChange={handleFileChange}
              type="file"
              id="myFile"
              name="filename"
            ></input>
          </Form.Item>

          <Form.Item label="Chọn ảnh bổ sung:" name="imagesub1">
            <input
              onChange={handleFileChange1}
              type="file"
              id="subFile1"
              name="subFile1"
            ></input>
          </Form.Item>

          <Form.Item label="Chọn ảnh bổ sung:" name="imagesub2">
            <input
              onChange={handleFileChange2}
              type="file"
              id="subFile2"
              name="subFile2"
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
