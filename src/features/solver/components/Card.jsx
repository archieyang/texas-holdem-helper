import React from "react";
import Poker from "../../../dep/poker";
import _ from "lodash";

const Card = ({card, onClick}) => {
  let data = _.isEmpty(card)
    ? Poker.getBackData(200)
    : Poker.getCardData(200, card.suit, card.rank);
  return <img src={data} className="Card" onClick={onClick} alt="" />;
};

export default Card;
