import React, { Component } from "react";
import Card from "./card";
import Chip from "@material-ui/core/Chip";
import useWindowDimensions from "../hooks/useWindowDimensions";

let Panel = (props) => {
  const { height, width } = useWindowDimensions();
  let winner = props.winner && props.winner === true;
  return (
    <table style={{ width }}>
      <tbody>
        <tr>
          {winner === true && (
            <td>
              <Chip
                label="WINNER!!!"
                style={{
                  backgroundColor: "white",
                }}
              />
            </td>
          )}
        </tr>
        <tr
          style={{
            backgroundColor: winner ? "blue" : "transparent",
          }}
        >
          <td>
            {props.cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  onClick={() => {
                    props.onCardClick(index, props.index);
                  }}
                />
              );
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Panel;
