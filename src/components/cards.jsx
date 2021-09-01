import React from "react";
import Card from "./card";

const Cards = (props) => {
  return (
    <div className="Cards">
      {props.cards.map((card, index) => {
        return (
          <Card
            {...props}
            backgroundColor="aqua"
            key={index}
            card={card}
            onClick={() => {
              props.onCardClick(index, props.index, card);
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
