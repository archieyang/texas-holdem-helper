import React from "react";
import Poker from "../dep/poker";
import _ from "lodash";

const Card = (props) => {
  let { card } = props;
  let data = _.isEmpty(card)
    ? Poker.getBackData(200)
    : Poker.getCardData(200, card.suit, card.rank);
  return (
    <img
      src={data}
      onClick={props.onClick}
      width={`${100 / props.col}%`}
      alt=""
    />
  );
};

export default Card;
