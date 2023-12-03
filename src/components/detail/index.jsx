import { CheckSquareOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Image, Row, Typography, Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../api/useProduct";
import { Card } from "../commons/card";

const Detail = () => {
  const { Title } = Typography;
  const [product, setProduct] = useState({});
  const [productFilter, setProductFilter] = useState([]);
  const [productList, setProductList] = useState([]);
  const { getProductById, getProduct } = useProduct();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // call api lay detail product
    getProductById(params.id).then((res) => {
      // di hien thi trang detail
      setProduct(res?.data?.data);
      // lay 25 san pham ve
      getProduct().then((item)=>{
        // filter theo brand
        setProductList(item?.data?.data?.filter((value)=>{
          return value?.id_brand === res?.data?.data?.id_brand && value?.id !== res?.data?.data?.id
        }))  
        // filter theo price
        setProductFilter(item?.data?.data?.filter((value)=>{
            return (
              (Math.abs(res?.data?.data?.price - value?.price) <3000000 || -Math.abs(res?.data?.data?.price - value?.price) >-3000000)
              && value?.id !== res?.data?.data?.id
              // (value.price < (res?.data?.data?.price - 2000000)) 
            ) 
        }))  
      })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // call api lay list product
  }, []);

  console.log(productList);

  // filter brand : duyet mang 25 san pham lay ve, sau do filter (so sanh product.id voi id_brand cua 25 sp do)

//   const detailList = productList.filter((res)=>{
//     // log ra coi nhu rang roi xu ly tiep
//     // dung lam lung tung => hieu cai filter nhu rang r lam
//       return res.id_brand === product.id_brand;
//   })
// console.log(detailList);

const handleDetail = (id) => {
  navigate(`/detail/${id}`);
  window.location.reload()
};

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
            <div>
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
          </div>
        </Col>
      </Row>
      <Title level={3} style={{ marginTop: "20px" }}>
        Sản phẩm cùng hãng tương tự
      </Title>
      <div className="detail-card">
      <Row gutter={[24, 16]}>
          {productList &&
            productList?.map((item, index) => {
              return (
                <Col key={index} span={6}>
                  <Card
                    title={item?.name}
                    price={item?.price}
                    image={item?.image}
                    handleClick={() => handleDetail(item?.id)}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
      <Title level={3} style={{ marginTop: "20px" }}>
        Sản phẩm có giá tương tự
      </Title>
      <div className="detail-card">
      <Row gutter={[24, 16]}>
          {productFilter &&
            productFilter?.slice(0,4)?.map((item, index) => {
              return (
                <Col key={index} span={6}>
                  <Card
                    title={item?.name}
                    price={item?.price}
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
