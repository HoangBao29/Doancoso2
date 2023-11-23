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
      "https://www.facebook.com/profile.php?id=100052074460983",
      "_blank"
    );
  };

  const handlePhone = () => {
    window.open("tel:0888913509");
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
            Liên hệ: 0888.913.509
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
          Địa chỉ: 470 Trần Đại Nghĩa, Hoà Quý, Ngũ Hành Sơn, Đà Nẵng.
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Sidebar;
