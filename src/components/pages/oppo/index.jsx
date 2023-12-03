import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../../api/useProduct";
import { Card } from "../../commons/card";

const Oppo = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const { getProduct } = useProduct();

  useEffect(() => {
    getProduct().then((res)=>{
      console.log(res);
      setProduct(res?.data?.data.filter((item)=>{
        console.log(item);
        return item.id_brand ===4 ;
      }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(product);
  return (
    <div className="wrapper-detail__card">
      <Breadcrumb
        style={{ marginBottom: "20px" }}
        items={[
          { title: <Link to="/">Trang chủ</Link> },
          { title: <span>Oppo</span> },
        ]}
      />

      <Row gutter={[24, 16]}>
        {product &&
          product.map((item, index) => {
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

export default Oppo;

