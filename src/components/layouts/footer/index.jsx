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
            <Col span={14}>
              <ul>
                <li>
                  <Link to="/" className="wrapper-footer__logo">
                    <img
                      src={require("../../../assets/images/logo.png")}
                      alt="logo"
                    />
                    <span>Phan Hoàng Bảo</span>
                  </Link>
                </li>
                {/* <li>
                  Công ty TNHH Một thành viên Thương mại và Dịch vụ Hoàng Long
                  Thịnh Phát
                </li> */}
                <li>
                  <span>Người đại diện: </span>
                  <span>Phan Hoàng Bảo</span>
                </li>
                <li>
                  <span>Mã sinh viên: </span>
                  <span>22IT.B017</span>
                </li>
                <li>
                  <span>Trụ sở chính: </span>
                  <span>
                    470 Trần Đại Nghĩa, phường Hoà Quý, Quận Ngũ Hành Sơn, thành phố
                    Đà Nẵng, Việt Nam.
                  </span>
                </li>
                <li>
                  <span>Số điện thoại: </span>
                  <span>0888913509</span>
                </li>
              </ul>
            </Col>
            {/* <Col span={4}>
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
            </Col> */}
            <Col span={10}>
              <ul>
                <li>Liên hệ</li>
                <li>Hotline: 0888.913.509</li>
                <li>Email: bao0898232205@gmail.com</li>
                <li>Zalo: 0888913509</li>
              </ul>
            </Col>
          </Row>
        </div>
      )}
    </footer>
  );
};

export default Footer;
