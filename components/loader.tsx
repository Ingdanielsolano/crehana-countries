import { LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FC } from "react";

interface LoaderProps {
  visible: boolean;
}

const Loader: FC<LoaderProps> = ({ visible }) => (
  <Modal
    visible={visible}
    footer={false}
    centered
    closable={false}
    className="loader"
    maskStyle={{
      backgroundColor: "transparent",
    }}
  >
    <LoadingOutlined style={{ fontSize: 24 }} spin />
  </Modal>
);

export default Loader;
