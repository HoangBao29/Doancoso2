import { FacebookOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const handleClick = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=100091660012776",
      "_blank"
    );
  };

  const handlePhone = () => {
    window.open("tel:0902005762");
  };

  if (!token) {
    return (
      <div className="wrapper-sidebar">
        <div className="wrapper-sidebar__button">
          <Button
            onClick={handlePhone}
            icon={<PhoneOutlined />}
            className="button-common"
          >
            Liên hệ: 0902.005.762
          </Button>
          <Button
            onClick={handleClick}
            className="button-common"
            icon={<FacebookOutlined />}
          >
            Facebook
          </Button>
        </div>
        <Button className="button-common outline">
          Địa chỉ: Tổ 22C, Hòa Phát, Cẩm Lệ, Đà Nẵng
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Sidebar;
