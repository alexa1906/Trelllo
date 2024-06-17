import React from "react";

interface CardType {
  id: string;
  content: string;
}

const Card = ({ card }: { card: CardType }) => {
  return (
    <div className="card">
      <p>{card.content}</p>
    </div>
  );
};

export default Card;
