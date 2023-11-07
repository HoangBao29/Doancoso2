import { Image, Typography } from "antd";

export const Card = ({ title, price, image, handleClick, brand }) => {
  const { Title } = Typography;
  return (
    <div className="wrapper-card">
      <Image alt="example" src={image} />
      <div onClick={handleClick} className="wrapper-card__content">
        <Title level={5}>{title}</Title>
        <span className="brand-name">Thương hiệu: </span>
        <span className="brand-name">{brand}</span>
        <div>
          <span>Giá: </span>
          {price ? (
            <>
              <span>{price.toLocaleString()}</span>
            </>
          ) : (
            <span>Liên hệ</span>
          )}
        </div>
      </div>
    </div>
  );
};
