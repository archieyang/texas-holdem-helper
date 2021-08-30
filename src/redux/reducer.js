import { Types } from "../action";
import { Default } from "../data/cardData";
import { fromJS } from "immutable";
import _ from "lodash";
import { Hand } from "pokersolver";
import { Suit, Rank } from "../data/cardData";

// const initState = fromJS({
//   showDialog: false,
//   community: [{}, {}, {}, {}, {}],
//   players: [{ cards: [{}, {}] }, { cards: [{}, {}] }],
//   editing: { default: { Default } },
// });

const initState = fromJS({
  showDialog: false,
  community: [
    { suit: Suit.HEART, rank: Rank.THREE },
    { suit: Suit.CLUB, rank: Rank.FOUR },
    { suit: Suit.SPADE, rank: Rank.FIVE },
    { suit: Suit.HEART, rank: Rank.JACK },
    { suit: Suit.HEART, rank: Rank.QUEEN },
  ],
  players: [
    {
      cards: [
        { suit: Suit.DIAMOND, rank: Rank.ACE },
        { suit: Suit.DIAMOND, rank: Rank.TWO },
      ],
    },
    {
      cards: [
        { suit: Suit.CLUB, rank: Rank.TWO },
        { suit: Suit.HEART, rank: Rank.TWO },
      ],
    },
  ],
  editing: { default: { Default } },
});

const setCard = (state, key, value) => {
  const editing = state.get("editing");
  if (editing.get("playerIndex") === -1) {
    return state.setIn(["community", editing.get("cardIndex"), key], value);
  } else {
    return state.setIn(
      [
        "players",
        editing.get("playerIndex"),
        "cards",
        editing.get("cardIndex"),
        key,
      ],
      value
    );
  }
};

const convertToString = (cards) => {
  let ret = [];
  cards.forEach((value) => {
    ret.push((value.rank == 10 ? "T" : value.rank) + value.suit);
  });

  return ret;
};

const reducer = (state = initState, action) => {
  //test

  switch (action.type) {
    case Types.START_EDITING:
      if (action.payload.playerIndex === -1) {
        action.payload.default = state
          .get("community")
          .get(action.payload.cardIndex)
          .toJS();
      } else {
        action.payload.default = state
          .get("players")
          .get(action.payload.playerIndex)
          .get("cards")
          .get(action.payload.cardIndex)
          .toJS();
      }

      if (_.isEmpty(action.payload.default)) {
        action.payload.default = Default;
      }

      return setCard(
        setCard(
          state.set("editing", fromJS(action.payload)).set("showDialog", true),
          "suit",
          action.payload.default.suit
        ),
        "rank",
        action.payload.default.rank
      );

    case Types.FINISH_EDITING:
      return state.set("showDialog", false);

    case Types.SUIT_CHANGED:
      return setCard(state, "suit", action.payload.suit);

    case Types.RANK_CHANGED:
      return setCard(state, "rank", action.payload.rank);

    case Types.SOLVE:
      let plainState = state.toJS();

      plainState.players.forEach((player) => {
        delete player.winner;
      });

      let hands = plainState.players.map((player) => {
        return Hand.solve(
          convertToString([...player.cards, ...plainState.community])
        );
      });

      let solvedHands = Hand.winners(hands);

      hands.forEach((value, index) => {
        solvedHands.forEach((winner) => {
          if (_.isEqual(value, winner)) {
            plainState.players[index].winner = true;
          }
        });
      });

      return fromJS(plainState);

    default:
      return state;
  }
};
export default reducer;
