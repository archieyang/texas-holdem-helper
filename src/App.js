import logo from "./logo.svg";
import "./App.css";
import Panel from "./components/panel";
import PickerDialog from "./components/pickerDialog";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Types } from "./action";
import Button from "@material-ui/core/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Panel
          onCardClick={this.props.handleStartEditing}
          cards={this.props.community}
          index={-1}
          key={-1}
          winner={false}
        />
        {this.props.players.map((player, index) => {
          return (
            <Panel
              onCardClick={this.props.handleStartEditing}
              cards={player.cards}
              key={index}
              index={index}
              winner={player.winner}
            />
          );
        })}

        <PickerDialog
          open={this.props.showDialog}
          handleClose={this.props.handleFinishEditing}
          handleSuitChange={this.props.handleSuitChanged}
          handleRankChange={this.props.handleRankChanged}
          editing={this.props.editing}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.handleSolve}
        >
          Solve
        </Button>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return state.toJS();
};

const dispatchToProps = (dispatch) => {
  return {
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
