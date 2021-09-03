import React from "react";
import Card from "./Card";

const Cards = ({ cards, onClick }) => {
  return (
    <div className="Cards">
      {cards.map((card, cardIndex) => {
        return (
          <Card
            key={cardIndex}
            card={card}
            onClick={() => {
              onClick({ cardIndex, card });
            }}
          />
        );
      })}
    </div>
  );
};

Cards.defaultProps = {
  col: 5,
};
export default Cards;
