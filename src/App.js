import "./App.css";
import Panel from "./components/panel";
import PickerDialog from "./components/pickerDialog";
import React from "react";
import { connect } from "react-redux";
import { Types } from "./action";
import { ACTION_BUTTON } from "./styles/style";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Appbar from "./components/appbar";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";

const App = (props) => {
  return (
    <div>
      <Appbar
        position="fixed"
        onAddClick={props.handleAddPlayer}
        onResetClick={props.handleReset}
      />

      <Container maxWidth="sm" align="center">
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
          onClick={props.isValid ? props.handleSolve : props.showErrorPrompt}
        >
          Solve
        </Button>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={props.errorPrompt}
        autoHideDuration={3000}
        onClose={props.hideErrorPrompt}
      >
        <Alert severity="error">Duplicate card</Alert>
      </Snackbar>

      <PickerDialog
        open={props.showDialog}
        onCardClick={props.handleCardChanged}
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

    handleCardChanged: (_p1, _p2, card) => {
      dispatch({
        type: Types.CARD_CHANGED,
        payload: card,
      });
    },

    showErrorPrompt: () => {
      dispatch({
        type: Types.SHOW_ERROR_PROMPT,
      });
    },
    hideErrorPrompt: () => {
      dispatch({
        type: Types.HIDE_ERROR_PROMPT,
      });
    },

    handleSolve: () => {
      dispatch({
        type: Types.SOLVE,
      });
    },
  };
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default connect(stateToProps, dispatchToProps)(App);
