import { Button, Image, Table, Typography, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../api/useProduct";
import Create from "./products/create";
import Edit from "./products/edit";

const Admin = () => {
  const [listProduct, setListProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [tableScrollHeight, setTableScrollHeight] = useState(0);
  const [idEdit, setIdEdit] = useState("");
  const { getProduct, deleteProduct, getProductById, deleteImage } =
    useProduct();
  const { Title } = Typography;
  const navigate = useNavigate();

  useEffect(() => {
    //  call api lay 25 san pham ve
    getProduct().then((res)=>{
      setListProduct(res?.data?.data);
    })
    const windowHeight = window.innerHeight;
    const subtractValue = 330;
    const calculatedHeight = windowHeight - subtractValue;
    setTableScrollHeight(calculatedHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (url) => <Image src={require(`../../assets/images/products/${url}`)} alt="Ảnh" />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thương hiệu",
      dataIndex: "id_brand",
      key: "id_brand",
      render: (id_brand) => {
        if (id_brand === 1) {
          return 'Apple';
        } else if (id_brand === 2) {
          return 'Samsung';
        } else if (id_brand === 3) {
          return 'Xiaomi';
        }else if (id_brand === 4) {
          return 'Oppo';
        }else if (id_brand === 5) {
          return 'Realme';
        }else {
          return '';
        }
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tồn kho",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Ngày mở bán",
      dataIndex: "created_at",
      key: "created_at",
      render: (value) =>
        value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="wrapper-action">
          <Button onClick={() => handleEdit(record?.id)}>Sửa</Button>
          <Button onClick={() => handleRemove(record?.id)}>Xóa</Button>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalEditOpen(false);
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleRemove = (id) => {
    getProductById(id).then((res) => {
      deleteImage(
        res?.data?.[0]?.image,
        res?.data?.[0]?.imagesub1,
        res?.data?.[0]?.imagesub2
      );
      deleteProduct(id).then((res) => {
        message.success("Xóa sản phẩm thành công", 1);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      });
    });
  };

  const handleEdit = (id) => {
    setIdEdit(id);
    setIsModalEditOpen(true);
  };

  return (
    <>
      <div className="wrapper-admin">
        <Title>DANH SÁCH SẢN PHẨM</Title>
        <div className="wrapper-action">
          <Button onClick={handleCreate}>Thêm sản phẩm</Button>
        </div>
        <Table
          columns={columns}
          dataSource={listProduct}
          rowKey={(listProduct) => listProduct.id}
          pagination={{
            position: ["topRight"],
          }}
          scroll={{
            x: 1300,
            y: tableScrollHeight,
          }}
        />
      </div>
      <Create isModalOpen={isModalOpen} handleCancel={handleCancel} />
      <Edit
        isModalOpen={isModalEditOpen}
        handleCancel={handleCancel}
        id={idEdit}
      />
    </>
  );
};

export default Admin;
