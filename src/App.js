import "./App.css";
import Panel from "./features/solver/components/Panel";
import CardPickerDialog from "./features/solver/components/CardPickerDialog";
import React from "react";
import { ACTION_BUTTON } from "./common/styles/style";
import Button from "@material-ui/core/Button";
import Appbar from "./features/solver/components/Appbar";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { solverSelector, solve } from "./features/solver/solverSlice";
import BottomPrompt from "./common/components/BottomPrompt";

const App = () => {
  const data = useSelector(solverSelector);
  const dispatch = useDispatch();

  const onSolveClicked = () => {
    dispatch(solve());
  };

  return (
    <div>
      <Appbar position="fixed" />

      <Container maxWidth="sm" align="center">
        <Panel playerIndex={-1} key={-1} winner={false} />

        {data.players.map((player, index) => {
          return (
            <Panel key={index} playerIndex={index} winner={player.winner} />
          );
        })}

        <Button
          variant="contained"
          color="primary"
          style={ACTION_BUTTON}
          onClick={onSolveClicked}
        >
          Solve
        </Button>
      </Container>
      <BottomPrompt message={data.errorPrompt} />

      <CardPickerDialog open={data.showDialog} editing={data.editing} />
    </div>
  );
};

export default App;
