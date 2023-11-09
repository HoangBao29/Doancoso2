import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <footer>
      {token ? (
        <></>
      ) : (
        <div className="wrapper-footer">
          <Row gutter={[24]}>
            <Col span={10}>
              <ul>
                <li>
                  <Link to="/" className="wrapper-footer__logo">
                    <img
                      src={require("../../../assets/images/logo.png")}
                      alt="logo"
                    />
                    <span>Hoàng Long Thịnh Phát</span>
                  </Link>
                </li>
                <li>
                  Công ty TNHH Một thành viên Thương mại và Dịch vụ Hoàng Long
                  Thịnh Phát
                </li>
                <li>
                  <span>Người đại diện: </span>
                  <span>Phan Thanh Linh</span>
                </li>
                <li>
                  <span>Trụ sở chính: </span>
                  <span>
                    Tổ 22C, phường Hòa Phát, quận Cẩm Lệ, thành phố Đà Nẵng,
                    Việt Nam
                  </span>
                </li>
                <li>
                  <span>Tổng kho: </span>
                  <span>
                    79B Đinh Liệt, phường Hòa An, quận Cẩm Lệ, thành phố Đà
                    Nẵng, Việt Nam.
                  </span>
                </li>
                <li>
                  <span>Số điện thoại: </span>
                  <span>0902005762</span>
                </li>
              </ul>
            </Col>
            <Col span={4}>
              <ul>
                <li>Giới thiệu</li>
                <li>Về Hoàng Long Thành Phát</li>
                <li>Hệ thống cửa hàng</li>
                <li>Tuyển dụng</li>
              </ul>
            </Col>
            <Col span={6}>
              <ul>
                <li>Dịch vụ khách hàng</li>
                <li>Chính sách điều khoản</li>
                <li>Hướng dẫn mua hàng</li>
                <li>Chính sách bảo hành</li>
                <li>Chính sách đổi trả</li>
              </ul>
            </Col>
            <Col span={4}>
              <ul>
                <li>Liên hệ</li>
                <li>Hotline</li>
                <li>Email</li>
                <li>Messenger</li>
                <li>Zalo</li>
              </ul>
            </Col>
          </Row>
        </div>
      )}
    </footer>
  );
};

export default Footer;
