import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";



const BoardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleOk = () => {
    // Logic to create a new board or navigate to a board creation page
    if (newBoardName.trim()) {
      // Assuming you have a function to create a board (replace with your logic)
      createBoard(newBoardName);
      setNewBoardName("");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateBoard = () => {
    setIsModalOpen(true);
  };

  const handleBoardClick = (boardId: Number) => {
    navigate(`/board/${boardId}`, { state: { username } });
  };

  // Function to handle board creation (replace with your actual implementation)
  const createBoard = (boardName: string) => {
    console.log(`Creating new board: ${boardName}`);
    // Handle API call or other logic to create the board and potentially update state
  };

  return (
    <div>
      <div className="profile-header">
        <div className="user-info">
          <div className="user-picture"></div>
          <div className="username">{username}</div>
        </div>
        <button onClick={handleCreateBoard}>+ Create Board</button>
      </div>
      <div className="board-list">
        {/* Replace with dynamic board listing */}
        <div onClick={() => handleBoardClick(1)}>Board 1</div>
        <div onClick={() => handleBoardClick(2)}>Board 2</div>
      </div>
      <Modal
        title="Create Board"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter board name"
          required
        />
      </Modal>
    </div>
  );
};

export default BoardList;
