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
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(params.id).then((res) => {
      setProduct(res?.data);
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
            <Row key={index} gutter={40} className="wrapper-detail__content">
              <Col span={12}>
                {item?.image ? (
                  <Carousel autoplay>
                    {item?.image ? <img src={item?.image} alt="img" /> : <></>}
                    {item?.imagesub1 ? (
                      <img src={item?.imagesub1} alt="img" />
                    ) : (
                      <></>
                    )}
                    {item?.imagesub2 ? (
                      <img src={item?.imagesub2} alt="img" />
                    ) : (
                      <></>
                    )}
                  </Carousel>
                ) : (
                  <Image
                    src={require("../../assets/images/no-image.png")}
                    alt="slide"
                  />
                )}
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
                  {item?.brand ? (
                    <div>
                      <span>Thương hiệu: </span>
                      <span>{item?.brand}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.model ? (
                    <div>
                      <span>Model: </span>
                      <span>{item?.model}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.watt ? (
                    <div>
                      <span>Công suất: </span>
                      <span>{item?.watt}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.engine ? (
                    <div>
                      <span>Động cơ: </span>
                      <span>{item?.engine}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.size ? (
                    <div>
                      <span>Kích thước: </span>
                      <span>{item?.size}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.weight ? (
                    <div>
                      <span>Trọng lượng: </span>
                      <span>{item?.weight}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {item?.description ? (
                    <div>
                      <span>Thông tin thêm: </span>
                      <span>{item?.description}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <ul className="wrapper-detail__content__intro">
                  <li>
                    <CheckSquareOutlined />
                    Miễn phí lắp đặt Toàn Quốc
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Phụ kiện chính hãng đi kèm đầy đủ
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Bảo hành chính hãng dài hạn
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Cam kết giá tốt nhất thị trường
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Giao hàng toàn quốc
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Hàng chính hãng 100%
                  </li>
                  <li>
                    <CheckSquareOutlined />
                    Liên hệ” để biết chính xác giá sản phẩm
                  </li>
                </ul>
              </Col>
            </Row>
          );
        })}
      <Title level={3} style={{ marginTop: "20px" }}>
        Sản phẩm cùng loại tương tự
      </Title>
      <div className="detail-card">
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
    </div>
  );
};

export default Detail;
