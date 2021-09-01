import React from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Cards from "./cards";

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

      <Cards {...props} />
    </div>
  );
};

export default Panel;
