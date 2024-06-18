import { useState } from "react";
import { Modal, Input } from "antd";
import "./card.css";

const { TextArea } = Input;

interface CardProps {
  card: { id: string; content: string };
}

const Card = ({ card }: CardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Card Description:", description);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="card" onClick={showModal}>
        {card.content}
      </div>
      <Modal
        title={card.content}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Card;
