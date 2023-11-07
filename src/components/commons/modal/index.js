import { Modal } from "antd";
import React from "react";

const ModalCommon = ({ isModalOpen, handleOk, onCancel, title }) => {
  return (
    <div className="wrapper-register">
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        footer={null}
      ></Modal>
    </div>
  );
};

export default ModalCommon;
