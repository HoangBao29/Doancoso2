import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../api/useProduct";
import { Card } from "../../commons/card";

const Circle = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const { getProduct } = useProduct();

  useEffect(() => {
    getProduct("Máy phát hàn").then((res) => {
      setProduct(res?.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper-detail">
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

export default Circle;
