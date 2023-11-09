import {
  MenuOutlined,
  MessageOutlined,
  SearchOutlined,
  UserSwitchOutlined,
  ApiOutlined,
  CarOutlined,
  DashboardOutlined,
  DotChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { AutoComplete, Button, Menu, Drawer } from "antd";
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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
    getItem("Máy phát điện", "sub2"),
    getItem("Máy nén khí", "sub3"),
    getItem("Máy phát hàn", "sub4"),
    getItem("Xe nâng", "sub5"),
  ];

  const itemsMenu = [
    getItem("Máy phát điện", "sub2", <ThunderboltOutlined />),
    getItem("Máy nén khí", "sub3", <DotChartOutlined />),
    getItem("Máy phát hàn", "sub4", <ApiOutlined />),
    getItem("Xe nâng", "sub5", <CarOutlined />),
    getItem("Động cơ nổ khác", "sub6", <DashboardOutlined />),
    getItem("Giới thiệu", "sub7", <MessageOutlined />),
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

      case "sub7":
        navigate("/gioi-thieu");
        break;

      default:
        break;
    }
  };
  return (
    <header>
      <div className={`wrapper-header__top ${adminMode ? "admin-mode" : ""}`}>
        <div className="toggle">
          <MenuOutlined onClick={showDrawer} />
        </div>
        <Drawer placement="left" width="100%" onClose={onClose} open={open}>
          <Menu
            className="toggle-menu"
            mode="vertical"
            onSelect={onSelectMenu}
            items={itemsMenu}
            defaultSelectedKeys={["sub1"]}
          />
        </Drawer>
        {token ? (
          <div></div>
        ) : (
          <div className="menu-header">
            <Menu
              mode="horizontal"
              onSelect={onSelectMenu}
              items={items}
              defaultSelectedKeys={["sub1"]}
            />
          </div>
        )}
        <Link to="/" className="wrapper-header__top__logo">
          <img
            className="wrapper-header__logo"
            src={require("../../../assets/images/logo.png")}
            alt="logo"
          />
          <span>HOÀNG</span>
          <span>LONG</span>
        </Link>
        <div className="wrapper-header__top__action">
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
          <div className="action">
            {!token ? (
              <div
                style={{ marginRight: "10px" }}
                className="wrapper-header__top__admin"
              >
                <Link to="/gioi-thieu">
                  <MessageOutlined />
                  <span>Giới thiệu</span>
                </Link>
              </div>
            ) : (
              <div></div>
            )}
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
