import "./App.css";
import Panel from "./components/panel";
import PickerDialog from "./components/pickerDialog";
import React from "react";
import { connect } from "react-redux";
import { Types } from "./action";
import { ACTION_BUTTON } from "./styles/style";

import Button from "@material-ui/core/Button";
import Appbar from "./components/appbar";

const App = (props) => {
  return (
    <div className="App">
      <Appbar
        onAddClick={props.handleAddPlayer}
        onResetClick={props.handleReset}
      />
      <Panel
        onCardClick={props.handleStartEditing}
        cards={props.community}
        index={-1}
        key={-1}
        onDeletePlayer={() => {}}
        winner={false}
      />
      {props.players.map((player, index) => {
        return (
          <Panel
            onCardClick={props.handleStartEditing}
            onDeletePlayer={props.handleDeletePlayer}
            cards={player.cards}
            key={index}
            index={index}
            winner={player.winner}
          />
        );
      })}

      <Button
        variant="contained"
        color="primary"
        style={ACTION_BUTTON}
        onClick={props.handleSolve}
      >
        Solve
      </Button>

      <PickerDialog
        open={props.showDialog}
        handleClose={props.handleFinishEditing}
        handleSuitChange={props.handleSuitChanged}
        handleRankChange={props.handleRankChanged}
        editing={props.editing}
      />
    </div>
  );
};

const stateToProps = (state) => {
  return state.toJS();
};

const dispatchToProps = (dispatch) => {
  return {
    handleReset: () => {
      dispatch({
        type: Types.RESET,
      });
    },
    handleAddPlayer: () => {
      dispatch({
        type: Types.ADD_PLAYER,
      });
    },
    handleDeletePlayer: (playerIndex) => {
      dispatch({
        type: Types.DELETE_PLAYER,
        payload: {
          playerIndex,
        },
      });
    },
    handleStartEditing: (cardIndex, playerIndex) => {
      dispatch({
        type: Types.START_EDITING,
        payload: {
          cardIndex,
          playerIndex,
        },
      });
    },
    handleFinishEditing: () => {
      dispatch({
        type: Types.FINISH_EDITING,
      });
    },

    handleSuitChanged: (suit) => {
      dispatch({
        type: Types.SUIT_CHANGED,
        payload: {
          suit,
        },
      });
    },

    handleRankChanged: (rank) => {
      dispatch({
        type: Types.RANK_CHANGED,
        payload: {
          rank,
        },
      });
    },

    handleSolve: () => {
      dispatch({
        type: Types.SOLVE,
      });
    },
  };
};

export default connect(stateToProps, dispatchToProps)(App);
