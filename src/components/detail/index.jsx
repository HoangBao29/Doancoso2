import { CheckSquareOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Image, Row, Typography, Carousel } from "antd";
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
  console.log(params);
  const navigate = useNavigate();

  useEffect(() => {
    //goi ham lay productgetbyid (dung cho viec lay id tu tren thanh tim kiem tren trang web de dem ve cho trang detail)
    getProductById(params.id).then((res) => {
      console.log("resuikkj7ju7ju7j", res);
      setProduct(res?.data?.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleDetail = (id) => {
  //   navigate(`/detail/${id}`);
  //   window.location.reload();
  // };
  console.log(product);
  // var type = "";

  // switch (product?.[0]?.type) {
  //   case "Máy phát điện":
  //     type = "may-phat-dien";
  //     break;

  //   case "Máy phát hàn":
  //     type = "may-phat-hàn";
  //     break;

  //   case "Máy nén khí":
  //     type = "may-nen-khi";
  //     break;

  //   case "Xe nâng":
  //     type = "xe-nang";
  //     break;

  //   case "Động cơ nổ khác":
  //     type = "dong-co-no-khac";
  //     break;

  //   default:
  //     type = "";
  //     break;
  // }
  return (
    <div className="wrapper-detail">
      {/* <Breadcrumb
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          {
            title: <Link to={`/${type}`}>{product?.[0]?.type}</Link>,
          },
          { title: product?.[0]?.name },
        ]}
      /> */}
      <Row gutter={40} className="wrapper-detail__content">
        <Col span={12}>
          <Image src={require("../../assets/images/demo.webp")} />
        </Col>
        <Col span={12} className="wrapper-detail__content__description">
          <Title level={2}>{product?.name}</Title>
          <div>
            <span>Giá: </span>
            <span>{product?.price}</span> <br />
            <span className="custom-span">Công nghệ màn hình: </span>
            <span>PLS LCD</span> <br />
            <span className="custom-span">Độ phân giải: </span>
            <span>
              1080 x 2408 pixels, 50.0 MP x 5.0 MP x 2.0 MP x 2.0 MP, 8.0 MP
            </span>{" "}
            <br />
            <span className="custom-span">Kích thước màn hình: </span>
            <span>6.6" - tần số quét 120Hz</span> <br />
            <span className="custom-span">Hệ điều hành: </span>
            <span>Android 12</span> <br />
            <span className="custom-span">Vi xử lý: </span>
            <span>SnapDragon 695 5G</span> <br />
            <span className="custom-span">Bộ nhớ trong: </span>
            <span>128 GB</span> <br />
            <span className="custom-span">RAM: </span>
            <span>4 GB</span>
            <br />
            <span className="custom-span">Mạng di động: </span>
            <span>Hỗ trợ 5G</span>
            <br />
            <span className="custom-span">Số khe SIM: </span>
            <span>SIM Kép</span>
            <br />
            <span className="custom-span">Dung lượng pin: </span>
            <span>5000 mAh</span>
            <br />
          </div>
        </Col>
      </Row>
      <Title level={3} style={{ marginTop: "20px" }}>
        Sản phẩm cùng loại tương tự
      </Title>
      {/* <div className="detail-card">
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
      </div> */}
    </div>
  );
};

export default Detail;
