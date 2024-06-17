import React, { useState, useEffect } from "react";
import Column from "./Column";
import { useParams } from "react-router-dom";

interface Board {
  id: string;
  name: string;
  columns: ColumnType[];
  participants: string[];
}

interface ColumnType {
  id: string;
  title: string;
  cards: { id: string; content: string }[];
}

const initialData: Record<string, Board> = {
  "1": {
    id: "1",
    name: "Board 1",
    participants: ["dima", "radu", "katea"],
    columns: [
      {
        id: "1",
        title: "To Do",
        cards: [
          { id: "1", content: "Task 1" },
          { id: "4", content: "Task 4" },
        ],
      },
      {
        id: "2",
        title: "In Progress",
        cards: [{ id: "2", content: "Task 2" }],
      },
      { id: "3", title: "Done", cards: [{ id: "3", content: "Task 3" }] },
    ],
  },
  "2": {
    id: "2",
    name: "Board 2",
    participants: ["alexa", "delia", "danu"],
    columns: [
      {
        id: "1",
        title: "To Do",
        cards: [
          { id: "1", content: "Task A" },
          { id: "4", content: "Task D" },
        ],
      },
      {
        id: "2",
        title: "In Progress",
        cards: [{ id: "2", content: "Task B" }],
      },
      { id: "3", title: "Done", cards: [{ id: "3", content: "Task C" }] },
    ],
  },
};

const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [boardName, setBoardName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newCardText, setNewCardText] = useState("");
  const [showAddColumnForm, setShowAddColumnForm] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState<{
    columnId: string;
  } | null>(null);

  useEffect(() => {
    if (boardId && initialData[boardId]) {
      const board = initialData[boardId];
      setColumns(board.columns);
      setBoardName(board.name);
      setParticipants(board.participants);
    } else {
      console.log(`Board with ID ${boardId} not found`);
    }
  }, [boardId]);

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn: ColumnType = {
      id: Math.random().toString(36).substring(2, 15),
      title: newColumnTitle,
      cards: [],
    };

    setColumns([...columns, newColumn]);
    setNewColumnTitle("");
    setShowAddColumnForm(false);
  };

  const handleAddCard = (columnId: string) => {
    if (!newCardText.trim()) return;

    const newCardDescp = {
      id: Math.random().toString(36).substring(2, 15),
      content: newCardText,
    };

    const updatedColumns = columns.map((column) =>
      column.id === columnId
        ? { ...column, cards: [...column.cards, newCardDescp] }
        : column
    );

    setColumns(updatedColumns);
    setNewCardText("");
    setShowAddCardForm(null);
  };

  return (
    <>
      {boardName && <h2>{boardName}</h2>}
      <div className="participants-container">
        <h3>Participants</h3>
        <div className="participants-list">
          {participants.map((participant, index) => (
            <div key={index} className="participant">
              <div className="profile-photo"></div>
              <span>{participant}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            newCardTitle={newCardText}
            setNewCardTitle={setNewCardText}
            handleAddCard={() => handleAddCard(column.id)}
            showAddCardForm={showAddCardForm?.columnId === column.id}
            setShowAddCardForm={(show) =>
              setShowAddCardForm(show ? { columnId: column.id } : null)
            }
          />
        ))}

        {!showAddColumnForm && (
          <button onClick={() => setShowAddColumnForm(true)}>
            + Add Column
          </button>
        )}
        {showAddColumnForm && (
          <div className="add-column-form">
            <input
              type="text"
              placeholder="Enter column title"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <button onClick={handleAddColumn}>Add Column</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Board;
