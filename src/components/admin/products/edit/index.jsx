import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../../../../api/useProduct";

const Edit = ({ isModalOpen, handleOk, handleCancel, id }) => {
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [anh, setAnh] = useState("");
  const [anh1, setAnh1] = useState("");
  const [anh2, setAnh2] = useState("");
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
        setAnh1(res?.data?.[0]?.imagesub1);
        setAnh2(res?.data?.[0]?.imagesub2);
        formRef.current.setFieldsValue({
          name: res?.data?.[0]?.name,
          type: res?.data?.[0]?.type,
          brand: res?.data?.[0]?.brand,
          price: res?.data?.[0]?.price,
          watt: res?.data?.[0]?.watt,
          engine: res?.data?.[0]?.engine,
          weight: res?.data?.[0]?.weight,
          size: res?.data?.[0]?.size,
          description: res?.data?.[0]?.description,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = (values) => {
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
        updateProduct(values, id).then((res) => {
          deleteImage(anh, anh1, anh2);
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
          name="Edit"
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
            label="Tên"
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
            label="Chọn loại"
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

          <Form.Item name="brand" label="Thương hiệu">
            <Input placeholder="Thương hiệu sản phẩm" />
          </Form.Item>

          <Form.Item name="price" label="Giá">
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>

          <Form.Item name="watt" label="Công suất">
            <Input placeholder="Công suất sản phẩm" />
          </Form.Item>

          <Form.Item name="engine" label="Động cơ">
            <Input placeholder="Động cơ sản phẩm" />
          </Form.Item>

          <Form.Item name="size" label="Kích thước">
            <Input placeholder="Kích thước sản phẩm" />
          </Form.Item>

          <Form.Item name="weight" label="Trọng lượng">
            <Input placeholder="Trọng lượng sản phẩm" />
          </Form.Item>

          <Form.Item name="description" label="Thông tin thêm">
            <Input placeholder="Thông tin thêm" />
          </Form.Item>

          <Form.Item label="Chọn ảnh" name="image">
            <input
              onChange={handleFileChange}
              type="file"
              id="myFile"
              name="filename"
            ></input>
          </Form.Item>

          <Form.Item label="Ảnh bổ sung:" name="imagesub1">
            <input
              onChange={handleFileChange1}
              type="file"
              id="subFile1"
              name="subFile1"
            ></input>
          </Form.Item>

          <Form.Item label="Ảnh bổ sung:" name="imagesub2">
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

export default Edit;
