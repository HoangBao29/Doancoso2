import { Image, Typography } from "antd";

export const Card = ({ title, price, image, handleClick }) => {
  const { Title } = Typography;
  return (
    <div className="wrapper-card">
      <Image alt="example" src={require("../../../assets/images/demo.webp")} />
      <div onClick={handleClick} className="wrapper-card__content">
        <Title level={5}>{title}</Title>
        <div>
          <span>Giá: </span>
          <span>{price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
