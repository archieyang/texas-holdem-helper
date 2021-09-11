import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { Hand } from "pokersolver";
import { Suit, Rank } from "../../data/cardData";
const initialState = {
  showDialog: false,
  community: [
    { suit: Suit.HEART, rank: Rank.TWO },
    { suit: Suit.HEART, rank: Rank.THREE },
    { suit: Suit.CLUB, rank: Rank.FOUR },
    { suit: Suit.DIAMOND, rank: Rank.KING },
    { suit: Suit.SPADE, rank: Rank.KING },
  ],
  players: [
    {
      cards: [
        { suit: Suit.HEART, rank: Rank.ACE },
        { suit: Suit.HEART, rank: Rank.FIVE },
      ],
    },
    {
      cards: [
        { suit: Suit.CLUB, rank: Rank.ACE },
        { suit: Suit.CLUB, rank: Rank.KING },
      ],
    },
  ],
  editing: {},
  isValid: true,
};

const clearWinnerState = (state) => {
  state.players.forEach((player) => {
    player.winner = false;
  });
  return state;
};

const convertToString = (cards) => {
  let ret = [];
  cards.forEach((value) => {
    ret.push((value.rank === "10" ? "T" : value.rank) + value.suit);
  });

  return ret;
};

const validate = (state) => {
  const cards = [];

  state.community.forEach((card) => {
    cards.push(card);
  });

  state.players.forEach((player) => {
    player.cards.forEach((card) => {
      cards.push(card);
    });
  });

  const allCardsFilled = cards.every((card) => {
    return !_.isEmpty(card);
  });

  if (!allCardsFilled) {
    state.errorPrompt = "Empty card";
    return false;
  }

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (_.isEqual(cards[i], cards[j]) && !_.isEmpty(cards[i])) {
        state.errorPrompt = "Duplicate card";
        return false;
      }
    }
  }

  return true;
};

const solverSlice = createSlice({
  name: "solver",
  initialState,
  reducers: {
    reset(state, action) {
      clearWinnerState(state);
      state.players.map((player) => {
        player.cards = [{}, {}];
        return player;
      });
      state.community = [{}, {}, {}, {}, {}];
    },

    addPlayer(state, action) {
      clearWinnerState(state);
      state.players.push({ cards: [{}, {}] });
    },

    deletePlayer(state, action) {
      clearWinnerState(state);
      state.players.splice(action.payload.playerIndex, 1);
    },

    startEditing(state, action) {
      state.showDialog = true;
      state.editing = action.payload;
    },

    finishEditing(state, action) {
      state.showDialog = false;
      clearWinnerState(state);
      const { playerIndex, cardIndex } = state.editing;
      if (playerIndex === -1) {
        state.community[cardIndex] = action.payload;
      } else {
        state.players[playerIndex].cards[cardIndex] = action.payload;
      }
    },

    hideErrorPrompt(state, action) {
      delete state.errorPrompt;
    },

    solve(state, action) {
      clearWinnerState(state);
      if (!validate(state)) {
        return;
      }

      let containsEmptyCard = false;
      let hands = state.players.map((player) => {
        let cards = [...state.community];
        player.cards.forEach((item) => {
          if (!_.isEmpty(item)) {
            cards.push(item);
          } else {
            containsEmptyCard = true;
          }
        });

        return containsEmptyCard ? {} : Hand.solve(convertToString(cards));
      });

      let solvedHands = Hand.winners(hands);

      hands.forEach((value, index) => {
        solvedHands.forEach((winner) => {
          if (_.isEqual(value, winner)) {
            state.players[index].winner = true;
          }
        });
      });
    },
  },
});
export const {
  reset,
  addPlayer,
  deletePlayer,
  startEditing,
  finishEditing,
  hideErrorPrompt,
  solve,
} = solverSlice.actions;
export const solverSelector = (state) => state.solver;
export default solverSlice.reducer;
