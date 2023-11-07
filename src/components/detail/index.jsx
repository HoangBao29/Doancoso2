import { Breadcrumb, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../api/useProduct";
import { Card } from "../commons/card";

const Detail = () => {
  const { Title } = Typography;
  const [product, setProduct] = useState([]);
  const [productType, setProductType] = useState([]);
  const { getProductById, getProduct } = useProduct();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(params.id).then((res) => {
      setProduct(res?.data);
      console.log(res?.data);

      getProduct(res?.data?.[0]?.type).then((res) => {
        setProductType(res?.data);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
    window.location.reload();
  };

  var type = "";

  switch (product?.[0]?.type) {
    case "Máy phát điện":
      type = "may-phat-dien";
      break;

    case "Máy phát hàn":
      type = "may-phat-hàn";
      break;

    case "Máy nén khí":
      type = "may-nen-khi";
      break;

    case "Xe nâng":
      type = "xe-nang";
      break;

    case "Động cơ nổ khác":
      type = "dong-co-no-khac";
      break;

    default:
      type = "";
      break;
  }
  return (
    <div className="wrapper-detail">
      <Breadcrumb
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          {
            title: <Link to={`/${type}`}>{product?.[0]?.type}</Link>,
          },
          { title: product?.[0]?.name },
        ]}
      />

      {product &&
        product?.map((item, index) => {
          return (
            <Row key={index} gutter={20} className="wrapper-detail__content">
              <Col span={12}>
                <Image
                  src={require("../../assets/images/products/product1.jpg")}
                  alt="product"
                ></Image>
              </Col>
              <Col span={12}>
                <div className="wrapper-detail__content__description">
                  <Title level={2}>{item?.name}</Title>
                  <div>
                    <span>Giá: </span>
                    {item?.price ? (
                      <span>{item?.price.toLocaleString()}</span>
                    ) : (
                      <span>Liên hệ</span>
                    )}
                  </div>
                  <div>
                    <span>Thương hiệu: </span>
                    <span>{item?.brand}</span>
                  </div>
                  <div>
                    <span>Thông tin thêm: </span>
                    <span>{item?.description}</span>
                  </div>
                  <div>
                    <span>Cửa hàng hiện có: </span>
                    <span>
                      Công ty Hoàng Long Thịnh Phát, Tổ 22C, phường Hòa Phát,
                      quận Cẩm Lệ, thành phố Đà Nẵng.
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      <Title level={3} style={{ marginTop: "20px" }}>
        Sản phẩm cùng loại tương tự
      </Title>
      <Row gutter={[24, 16]}>
        {productType &&
          productType.map((item, index) => {
            return (
              <Col key={index} span={6}>
                <Card
                  title={item?.name}
                  price={item?.price}
                  brand={item?.brand}
                  image={item?.image}
                  handleClick={() => handleDetail(item?.id)}
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Detail;
