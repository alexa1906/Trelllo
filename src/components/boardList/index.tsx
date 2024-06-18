import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";
import "./boardList.css";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import axios from "axios";

interface Board {
  id: string;
  name: string;
  participants: string[];
  visibility: string;
  columns: Array<{
    id: string;
    title: string;
    cards: Array<{ id: string; content: string }>;
  }>;
}

const fetchBoards = async () => {
  console.log("Fetching All Boards");
  const response = await axios.get("/workspace");
  return response.data;
};

const BoardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [visibility, setVisibility] = useState("private");
  const [boards, setBoards] = useState<Record<string, Board>>({});

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const boardData = await fetchBoards();
        const formattedBoards = boardData.reduce(
          (acc: Record<string, Board>, board: any) => {
            acc[board.id] = {
              id: board.id.toString(),
              name: board.name,
              participants: board.workspaceUsersEntities.map((user: any) =>
                user.userId.toString()
              ),
              visibility: board.visibility,
              columns: [],
            };
            return acc;
          },
          {}
        );
        setBoards(formattedBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    loadBoards();
  }, []);

  const handleOk = () => {
    if (newBoardName.trim()) {
      createBoard(newBoardName, visibility);
      setNewBoardName("");
      setVisibility("private");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateBoard = () => {
    setIsModalOpen(true);
  };

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`, { state: { username } });
  };

  const createBoard = (boardName: string, visibility: string) => {
    const newBoardId = (Object.keys(boards).length + 1).toString();
    const newBoard: Board = {
      id: newBoardId,
      name: boardName,
      participants: [username],
      visibility,
      columns: [],
    };
    setBoards({
      ...boards,
      [newBoardId]: newBoard,
    });
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
        {Object.values(boards).map((board) => (
          <div
            key={board.id}
            onClick={() => handleBoardClick(board.id)}
            className="board-item"
          >
            <div className="board-name">{board.name}</div>
            <div className="board-icon">
              {board.visibility === "private" ? (
                <LockOutlined />
              ) : (
                <UnlockOutlined />
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        title="Create Board"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="board-name" className="styled-label">
          Board Name
        </label>
        <input
          id="board-name"
          className="styled-input"
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="Enter board name"
          required
        />
        <label htmlFor="visibility" className="styled-label">
          Visibility
        </label>
        <select
          id="visibility"
          className="styled-select"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          required
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </Modal>
    </div>
  );
};

export default BoardList;
