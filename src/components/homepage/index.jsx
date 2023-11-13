import { Carousel, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Pagination, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../api/useProduct";
import { Card } from "../commons/card";

const Homepage = () => {
  const { getProduct, getProductBrand } = useProduct();
  const [brand, setBrand] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(filterType, filterBrand, sort, page).then((res) => {
      setProduct(res?.data);
      setTotal(res?.count);
    });
    getProductBrand().then((res) => {
      setBrand(res?.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, filterBrand, sort, page]);

  const { Title } = Typography;

  const optionsType = [
    {
      label: "Máy phát điện",
      value: "Máy phát điện",
    },
    {
      label: "Máy nén khí",
      value: "Máy nén khí",
    },
    {
      label: "Máy phát hàn",
      value: "Máy phát hàn",
    },
    {
      label: "Xe nâng",
      value: "Xe nâng",
    },
    {
      label: "Linh kiện thiết bị điện tử",
      value: "Linh kiện thiết bị điện tử",
    },
    {
      label: "Động cơ nổ khác",
      value: "Động cơ nổ khác",
    },
  ];

  const uniqueBrand = Array.from(new Set(brand?.map((item) => item.brand)));
  const optionsBrand = uniqueBrand?.map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const handleChange = (value) => {
    setFilterType(value);
  };

  const handleChangeBrand = (value) => {
    setFilterBrand(value);
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handlePagination = (page) => {
    setPage(page);
  };

  const optionsSort = [
    {
      label: "Tăng dần",
      value: true,
    },
    {
      label: "Giảm dần",
      value: false,
    },
  ];

  const handleChangeSort = (value) => {
    setSort(value);
  };

  const handleClear = () => {
    setSort("");
  };

  return (
    <div className="wrapper-homepage">
      <div className="wrapper-homepage__slide">
        <Carousel autoplay autoplaySpeed={5000}>
          <img
            src={require("../../assets/images/slide/slide1.gif")}
            alt="slide"
          />
          <img
            src={require("../../assets/images/slide/slide2.gif")}
            alt="slide"
          />
          <img
            src={require("../../assets/images/slide/slide3.gif")}
            alt="slide"
          />
        </Carousel>
        <ul className="list-image">
          <li>
            <img
              src={require("../../assets/images/slide/slide3.gif")}
              alt="slide"
            />
          </li>
          <li>
            <img
              src={require("../../assets/images/slide/slide2.gif")}
              alt="slide"
            />
          </li>
        </ul>
      </div>
      <div className="wrapper-homepage__product">
        <Title>Sản phẩm nổi bật</Title>
        <div className="wrapper-homepage__product__select">
          <div className="wrapper-select">
            <Select
              style={{ width: "100%" }}
              onChange={handleChange}
              options={optionsType}
              placeholder="Chọn theo sản phẩm"
              allowClear
            />
            <Select
              style={{ width: "100%" }}
              onChange={handleChangeBrand}
              options={optionsBrand}
              placeholder="Chọn theo thương hiệu"
              allowClear
            />
          </div>
          <Select
            style={{ width: "100%" }}
            onChange={handleChangeSort}
            options={optionsSort}
            placeholder="Sắp xếp giá theo"
            allowClear
            onClear={handleClear}
          />
        </div>
        <Row gutter={[24, 16]}>
          {product &&
            product.map((item, index) => {
              return (
                <Col key={index} span={6}>
                  <Card
                    title={item?.name}
                    price={item?.price}
                    image={item?.image}
                    brand={item?.brand}
                    handleClick={() => handleDetail(item?.id)}
                  />
                </Col>
              );
            })}
        </Row>
        <Pagination
          className="wrapper-homepage__product__pagination"
          current={page}
          pageSize={8}
          total={total}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default Homepage;
