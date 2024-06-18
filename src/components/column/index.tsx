import Card from "../card";
import "./column.css";

interface ColumnType {
  id: string;
  title: string;
  cards: { id: string; content: string }[];
}

const Column = ({
  column,
  newCardTitle,
  setNewCardTitle,
  handleAddCard,
  showAddCardForm,
  setShowAddCardForm,
}: {
  column: ColumnType;
  newCardTitle: string;
  setNewCardTitle: (cardTitle: string) => void;
  handleAddCard: () => void;
  showAddCardForm: boolean;
  setShowAddCardForm: (show: boolean) => void;
}) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      {column.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      {showAddCardForm && (
        <div className="add-card-container">
          <input
            type="text"
            placeholder="Add a card"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      )}

      {!showAddCardForm && (
        <button onClick={() => setShowAddCardForm(true)}>+ Add Card</button>
      )}
    </div>
  );
};

export default Column;
