import {
  ApiOutlined,
  CarOutlined,
  DashboardOutlined,
  DotChartOutlined,
  HomeOutlined,
  PhoneOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Menu } from "antd";
import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../../api/useProduct";

const Header = ({ adminMode }) => {
  const { getProduct } = useProduct();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Trang chủ", "sub1", <HomeOutlined />),
    getItem("Máy phát điện", "sub2", <ApiOutlined />),
    getItem("Máy nén khí", "sub3", <DotChartOutlined />),
    getItem("Máy phát hàn", "sub4", <ThunderboltOutlined />),
    getItem("Xe nâng", "sub5", <CarOutlined />),
    getItem("Động cơ nổ khác", "sub6", <DashboardOutlined />),
  ];

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  const handleSearch = debounce((value) => {
    let page = 1;
    if (value) {
      page = undefined;
    } else {
      page = 1;
    }
    getProduct("", "", false, page, value).then((res) => {
      setOptions(
        res?.data?.map((item) => ({
          value: item.id.toString(),
          label: item.name,
        }))
      );
    });
  }, 500);

  const onSelect = (value, options) => {
    navigate(`/detail/${value}`);
    setValue(options?.label);
  };

  const handleChange = (value) => {
    setValue(value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const onSelectMenu = (value) => {
    switch (value?.key) {
      case "sub1":
        navigate("/");
        break;

      case "sub2":
        navigate("/may-phat-dien");
        break;

      case "sub3":
        navigate("/may-nen-khi");
        break;

      case "sub4":
        navigate("/may-phat-han");
        break;

      case "sub5":
        navigate("/xe-nang");
        break;

      case "sub6":
        navigate("/dong-co-no-khac");
        break;

      default:
        break;
    }
  };
  return (
    <header>
      <div className={`wrapper-header__top ${adminMode ? "admin-mode" : ""}`}>
        <Link to="/" className="wrapper-header__top__logo">
          <img
            className="wrapper-header__logo"
            src={require("../../../assets/images/logo.png")}
            alt="logo"
          />
          <span>Hoàng Long Thịnh Phát</span>
        </Link>
        {token ? (
          <div className="wrapper-header__top__admin">
            <Link onClick={handleLogout} to="/">
              <UserSwitchOutlined />
              <span>Client</span>
            </Link>
          </div>
        ) : (
          <div className="wrapper-header__top__admin">
            <Link to="/admin">
              <UserSwitchOutlined />
              <span>Admin</span>
            </Link>
          </div>
        )}
        {!token ? (
          <div className="wrapper-header__top__search">
            <AutoComplete
              style={{
                height: "auto",
              }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm cần tìm..."
              allowClear
              value={value}
            ></AutoComplete>
            <Button className="button" icon={<SearchOutlined />}></Button>
          </div>
        ) : (
          <></>
        )}
        {token ? (
          <></>
        ) : (
          <div className="wrapper-header__top__contact">
            <PhoneOutlined />
            <span>Liên hệ tư vấn</span>
          </div>
        )}
      </div>
      {token ? (
        <div></div>
      ) : (
        <div className="wrapper-header__bottom">
          <Menu
            mode="horizontal"
            onSelect={onSelectMenu}
            items={items}
            defaultSelectedKeys={["sub1"]}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
