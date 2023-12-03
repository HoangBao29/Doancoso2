import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProduct } from "../../../../api/useProduct";
import axios from "axios";

const Create = ({ isModalOpen, handleCancel }) => {
  const [type, setType] = useState("");
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();
  const formRef = useRef(null);
  const { postProduct } = useProduct();

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (values) => {
    const formData = new FormData();
    // console.log(avatar);
    formData.append("name", values.name)
    formData.append("category", 3)
    formData.append("status", 1)
    formData.append("sale", 1)
    formData.append("detail", "ff")
    formData.append("company", 3)
    formData.append("brand", values.brand)
    formData.append("price", values.price)
    console.log(file);
    // formData.append("file[]", file)
    // const img = {
    //   anh1: file
    // }
    const token = localStorage.getItem("token")

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    Object.keys(file).map((item)=>{
      formData.append("file[]", file[item])
    })
    //hiện thông tin nhập vào
    // postProduct(formData, token).then((res)=>{
    //   console.log(res);
    // })
    axios.post("http://localhost/laravel8/public/api/user/product/add", formData, config)
    //call api tạo sản phẩm mới
  
    // postProduct(values, token)
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
    setFile(e.target.files)
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
          encType="multipart/form-data"
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
            name="brand"
            rules={[
              {
                required: true,
                message: "Chọn thương hiệu của sản phẩm!",
              },
            ]}
          >
            <Select
              placeholder="Chọn thương hiệu của sản phẩm"
              onChange={(e) => {
                setType(e);
              }}
              options={[
                {
                  value: "Apple",
                  label: "Apple",
                },
                {
                  value: "Samsung",
                  label: "Samsung",
                },
                {
                  value: "Xiaomi",
                  label: "Xiaomi",
                },
                {
                  value: "Oppo",
                  label: "Oppo",
                },
                {
                  value: "Realme",
                  label: "Realme",
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="price">
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>

          <Form.Item name="active">
            <Input placeholder="Số lượng" />
          </Form.Item>


          {/* <Form.Item label="Chọn ảnh sản phẩm:" name="image">
            <input
              onChange={handleFileChange}
              type="file"
              multiple
            ></input>
          </Form.Item>  */}

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
