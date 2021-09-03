import React from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import Cards from "./Cards";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayer, startEditing } from "../solverSlice";

let Panel = ({ playerIndex, winner }) => {
  const isCommumity = playerIndex === -1;
  const dispatch = useDispatch();

  const cards = useSelector((state) => {
    if (playerIndex === -1) {
      return state.solver.community;
    } else {
      return state.solver.players[playerIndex].cards;
    }
  });

  const onDeletePlayer = () => {
    dispatch(deletePlayer({ playerIndex }));
  };

  const onCardClick = ({cardIndex}) => {
    dispatch(startEditing({ playerIndex, cardIndex }));
  };

  return (
    <div className="Panel">
      <Chip
        icon={<FaceIcon />}
        label={
          winner
            ? "WINNER"
            : isCommumity
            ? "Community"
            : `Player ${playerIndex}`
        }
        className={winner ? "Winner" : ""}
        color="primary"
        onDelete={isCommumity ? undefined : onDeletePlayer}
        style={{
          marginBottom: "1em",
          flexWrap: "wrap",
          width: "12em",
          alignSelf: "flex-start",
        }}
      />

      <Cards cards={cards} onClick={onCardClick} />
    </div>
  );
};

export default Panel;
