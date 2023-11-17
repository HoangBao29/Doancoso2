import { Col, Row, Typography } from "antd";
import React from "react";

const Introduce = () => {
  const { Title } = Typography;
  return (
    <div className="wrapper-introduce">
      <div className="wrapper-introduce__vie">
        <Title level={1}>Giới thiệu công ty Hoàng Long Thịnh Phát</Title>
        <p>
          CÔNG TY TNHH HOÀNG LONG THỊNH PHÁT được thành lập vào năm 2014, được
          lãnh đạo bởi người có nhiều năm kinh nghiệm trong lĩnh vực Máy phát
          điện, cùng với đội ngũ kỹ sư được tuyển dụng từ các trường đào tạo cơ
          khí uy tín. trong nước, được đào tạo chuyên nghiệp, có nhiều kinh
          nghiệm và kiến ​​thức chuyên sâu.
        </p>
        <p>
          Với phương châm luôn lấy uy tín và lợi ích của khách hàng lên hàng
          đầu. Hiện nay, Công ty Hoàng Long đã tạo dựng được uy tín vững chắc,
          chiếm được lòng tin của các khách hàng truyền thống như hệ thống ngân
          hàng, khách sạn, bệnh viện và cao ốc văn phòng trên khắp cả nước.
        </p>
        <p>
          Môi trường làm việc chuyên nghiệp và hệ thống quản lý hiệu quả, chúng
          tôi đã xây dựng được đội ngũ nhân viên giàu kinh nghiệm và năng động
          phấn đấu vì sự nghiệp kinh doanh của công ty.
        </p>
        <p>
          Chất lượng sản phẩm và dịch vụ là mục tiêu đầu tiên trong suốt hoạt
          động kinh doanh của chúng tôi. Mục tiêu của công ty chúng tôi là phục
          vụ khách hàng ngày càng tốt hơn với mục tiêu “Thỏa mãn nhu cầu của
          khách hàng”.
        </p>
        <p>
          Chúng tôi tin tưởng vào sự thành công và phát triển chung của khách
          hàng cũng như của Hoàng Long Thịnh Phát.
        </p>
      </div>
      <div className="wrapper-introduce__eng">
        <Title level={1}>Introduction about Hoang Long Genrator L.L.C</Title>
        <p>
          HOANG LONG THINH PHAT CO., LTD was established in 2014, led by a
          person with many years of experience in the field of Generators, along
          with a team of engineers recruited from prestigious mechanical
          training schools. in the country, professionally trained, have a lot
          of experience and in-depth knowledge.
        </p>
        <p>
          With the motto of always taking the prestige and interests of
          customers first. Now, Hoang Long Company has built a solid reputation,
          gaining the trust of traditional customers such as banking systems,
          hotels, hospitals and office buildings throughout the country.
        </p>
        <p>
          Professional working environment and effective management system, we
          have established a team of experienced and energetic staffs striving
          for the company's business.
        </p>
        <p>
          Product and Service quality are the first goals throughout our
          business. Our company's target is to serve customers better and better
          with the pursuit to" Satisfaction customer needs".
        </p>
        <p>
          We believe in mutual success and thriving business of our customer as
          well as of Hoang Long Thinh Phat.
        </p>
      </div>
      <div
        className="wrapper-introduce__powerpoint"
        style={{ marginTop: "40px", width: "100%" }}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp1.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp2.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp3.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp5.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp5.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp6.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp7.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp8.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp9.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp10.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp11.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp12.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp13.png")}
              alt="powerpoint"
            />
          </Col>
          <Col span={12}>
            <img
              src={require("../../assets/images/powerpoint/pp14.png")}
              alt="powerpoint"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Introduce;
