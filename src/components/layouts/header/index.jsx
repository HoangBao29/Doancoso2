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
  DeleteColumnOutlined,
  UserOutlined,
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
  const [tokenClient, setTokenClient] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTokenClient(localStorage.getItem("token-client"));
  }, []);

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
    getItem("Apple", "sub2"),
    getItem("Samsung", "sub3"),
    getItem("Xiaomi", "sub4"),
    getItem("Oppo", "sub5"),
    getItem("Realme", "sub6"),
  ];

  const itemsMenu = [
    getItem("Máy phát điện", "sub2", <ThunderboltOutlined />),
    getItem("Máy nén khí", "sub3", <DotChartOutlined />),
    getItem("Máy phát hàn", "sub4", <ApiOutlined />),
    getItem("Xe nâng", "sub5", <CarOutlined />),
    getItem("Động cơ nổ khác", "sub6", <DashboardOutlined />),
    getItem("Linh kiện thiết bị điện tử", "sub8", <DeleteColumnOutlined />),
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
    localStorage.removeItem("token-client");
    localStorage.removeItem("auth");
    window.location.reload();
  };

  const onSelectMenu = (value) => {
    onClose();
    switch (value?.key) {
      case "sub2":
        navigate("/apple");
        break;

      case "sub3":
        navigate("/samsung");
        break;

      case "sub4":
        navigate("/xiaomi");
        break;

      case "sub5":
        navigate("/oppo");
        break;

      case "sub6":
        navigate("/realme");
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
          <></>
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
          <span>BẢO</span>
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
            {/* toán tử 3 ngôi */}

            {tokenClient ? (
              <div
                style={{ marginRight: "10px" }}
                className="wrapper-header__top__admin"
              >
                <Link to="/gioi-thieu">
                  <UserOutlined />
                  <span>Trang cá nhân</span>
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            {tokenClient ? (
              <div className="wrapper-header__top__admin">
                <Link onClick={handleLogout} to="/login">
                  <UserSwitchOutlined />
                  <span>Đăng xuất</span>
                </Link>
              </div>
            ) : (
              <div className="wrapper-header__top__admin">
                <Link to="/login">
                  <UserSwitchOutlined />
                  <span>Đăng nhập</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="wrapper-header__bot">
        {!token ? (
          <div className="searching">
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
      </div>
    </header>
  );
};

export default Header;
