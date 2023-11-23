import { Carousel, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Pagination, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../api/useProduct";
import { Card } from "../commons/card";

const Homepage = () => {
  const { getProduct, getProductBrand } = useProduct();
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState([]);
  const [productPage, setProductPage] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // getProduct(filterType, filterBrand, sort, page).then((res) => {
    //   setProduct(res?.data);
    //   setTotal(res?.count);
    // });
    // getProductBrand(filterType).then((res) => {
    //   setBrand(res?.data);
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getProduct().then((res) => {
      setProduct(res?.data?.data);
      setProductPage(res?.data?.data?.slice(0, 8));
      console.log(res);
    });
  }, []);

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

  const handleChangeBrand = (value) => {
    setBrand(value);
    console.log(value);
    switch (value) {
      case "apple":
        value = 1;
        break;

      case "samsung":
        value = 2;
        break;

      case "xiaomi":
        value = 3;
        break;

      case "oppo":
        value = 4;
        break;

      case "realme":
        value = 5;
        break;
      default:
        break;
    }

    // filter danh sach product ? productPage
    const productFilter = product?.filter((item) => {
      if (value) {
        return value === item?.id_brand;
      } else {
        // value = underfined => clear select brand
        return { ...item };
      }
    });
    // kiem tra xem dang tang dan hay giam dan

    if (sort === "") {
      setProductPage(productFilter.slice(0, 8));
    } else {
      if (sort === true) {
        const sortProduct = productFilter.sort(function (a, b) {
          return a.price - b.price;
        });
        setProductPage(sortProduct.slice(0, 8));
      } else if (sort === false) {
        const sortProduct = productFilter.sort(function (a, b) {
          return b.price - a.price;
        });
        setProductPage(sortProduct.slice(0, 8));
        console.log("product", product);
      } else {
        const sortRandom = productFilter.sort(function (a, b) {
          return a.id - b.id;
        });
        setProductPage(sortRandom.slice(0, 8));
      }
    }
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handlePagination = (page, pageSize) => {
    setPage(page);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setProductPage(product?.slice(startIndex, endIndex));
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
    // tr hop tu nho toi lon
    // setSort(value);
    console.log("kiem tra value", value);
    const sortProductFunction = (sanpham) => {
      if (value === true) {
        const sortProduct = sanpham.sort(function (a, b) {
          return a.price - b.price;
        });
        setProductPage(sortProduct.slice(0, 8));
      } else if (value === false) {
        const sortProduct = sanpham.sort(function (a, b) {
          return b.price - a.price;
        });
        setProductPage(sortProduct.slice(0, 8));
        console.log("product", product);
      } else {
        const sortRandom = sanpham.sort(function (a, b) {
          return a.id - b.id;
        });
        setProductPage(sortRandom.slice(0, 8));
      }
    };
    if (brand === "") {
      sortProductFunction(product);
    } else {
      sortProductFunction(productPage);
    }
    //  tr hop tu lon toi be
  };

  const optionsBrand = [
    {
      label: "Apple",
      value: "apple",
    },
    {
      label: "Samsung",
      value: "samsung",
    },
    {
      label: "Xiaomi",
      value: "xiaomi",
    },
    {
      label: "Oppo",
      value: "oppo",
    },
    {
      label: "Realme",
      value: "realme",
    },
  ];

  console.log(productPage);
  // console.log("product", product);

  return (
    <div className="wrapper-homepage">
      <div className="wrapper-homepage__slide">
        <Carousel autoplay autoplaySpeed={3000}>
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/10/phu-kien-9fit-1200x375.jpg"
            alt="slide"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/15/web-dong-ho-kieslect-01.jpg"
            alt="slide"
          />
          <img
            src="https://cdn.hoanghamobile.com/i/home/Uploads/2023/11/17/1200x375-fold5flip5-171123.jpg"
            alt="slide"
          />
        </Carousel>
      </div>
      <div className="wrapper-homepage__product">
        <Title>Sản phẩm nổi bật</Title>
        <div className="wrapper-homepage__product__select">
          <div className="wrapper-select">
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
          />
        </div>
        <Row gutter={[24, 16]}>
          {productPage &&
            productPage?.map((item, index) => {
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
        <Pagination
          className="wrapper-homepage__product__pagination"
          current={page}
          pageSize={8}
          total={brand ? productPage?.length : product?.length}
          onChange={handlePagination}
        />
      </div>
      <div className="wrapper-homepage__consumer">
        <Title>Đối Tác Hoàng Bảo</Title>
        <div className="wrapper-homepage__consumer-logo">
          <img
            src={require("../../assets/images/logo/logo1.png")}
            alt="powerpoint"
          />
          <img
            src={require("../../assets/images/logo/logo2.png")}
            alt="powerpoint"
          />
          <img
            src={require("../../assets/images/logo/logo3.png")}
            alt="powerpoint"
          />
          <img
            src={require("../../assets/images/logo/logo4.png")}
            alt="powerpoint"
          />
          <img
            src={require("../../assets/images/logo/logo5.png")}
            alt="powerpoint"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
