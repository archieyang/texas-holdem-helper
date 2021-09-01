import React, { Component } from "react";
import Card from "./card";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const COL = 5;
const CARD_HEIGHT = 80;
const CARD_WIDTH = 60;

let Panel = (props) => {
  const winner = props.winner && props.winner === true;
  const index = props.index + 1;
  const isCommumity = index === 0;
  return (
    <div className="Panel">
      <Chip
        icon={<FaceIcon />}
        label={
          winner ? "WINNER" : isCommumity ? "Community" : `Player ${index}`
        }
        className={winner ? "Winner" : ""}
        color="primary"
        onDelete={
          isCommumity
            ? undefined
            : () => {
                props.onDeletePlayer(props.index);
              }
        }
        style={{
          marginBottom: "1em",
          flexWrap: "wrap",
          width: "12em",
          alignSelf: "flex-start",
        }}
      />

      <div className="Cards">
        {props.cards.map((card, index) => {
          return (
            <Card
              backgroundColor="aqua"
              key={index}
              card={card}
              height={CARD_HEIGHT}
              onClick={() => {
                props.onCardClick(index, props.index);
              }}
            />
          );
        })}

        {props.cards.length < COL &&
          [...Array(COL - props.cards.length).keys()].map((index) => {
            return <img width={CARD_WIDTH} height="0" key={-10 - index} />;
          })}
      </div>
    </div>
  );
};

export default Panel;
