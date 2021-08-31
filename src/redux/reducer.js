import { Types } from "../action";
import { Default } from "../data/cardData";
import { fromJS } from "immutable";
import _ from "lodash";
import { Hand } from "pokersolver";
import { Suit, Rank } from "../data/cardData";

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
  isValid: true,
  errorPrompt: false,
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

const validate = (state) => {
  const cards = [];

  state
    .get("community")
    .toJS()
    .forEach((card) => {
      cards.push(card);
    });

  state
    .get("players")
    .toJS()
    .forEach((player) => {
      player.cards.forEach((card) => {
        cards.push(card);
      });
    });

  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (_.isEqual(cards[i], cards[j])) {
        return state.set("isValid", false);
      }
    }
  }

  return state.set("isValid", true);
};

const convertToString = (cards) => {
  let ret = [];
  cards.forEach((value) => {
    ret.push((value.rank === "10" ? "T" : value.rank) + value.suit);
  });

  return ret;
};

const clearWinnerState = (state) => {
  state.players.forEach((player) => {
    delete player.winner;
  });
  return state;
};

const reducer = (state = initState, action) => {
  let plainState = state.toJS();
  switch (action.type) {
    case Types.RESET:
      plainState.players.map((player) => {
        player.cards = [{}, {}];
        delete player.winner;
      });
      plainState.community = [{}, {}, {}, {}, {}];
      return fromJS(plainState);
    case Types.ADD_PLAYER:
      return state.updateIn(["players"], (players) =>
        players.push(fromJS({ cards: [{}, {}] }))
      );
    case Types.DELETE_PLAYER:
      return state.updateIn(["players"], (arr) =>
        arr.splice(action.payload.playerIndex, 1)
      );
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

      return validate(
        setCard(
          setCard(
            state
              .set("editing", fromJS(action.payload))
              .set("showDialog", true),
            "suit",
            action.payload.default.suit
          ),
          "rank",
          action.payload.default.rank
        )
      );

    case Types.FINISH_EDITING:
      return state.set("showDialog", false);

    case Types.SUIT_CHANGED:
      return validate(
        setCard(
          fromJS(clearWinnerState(plainState)),
          "suit",
          action.payload.suit
        )
      );

    case Types.RANK_CHANGED:
      return validate(
        setCard(
          fromJS(clearWinnerState(plainState)),
          "rank",
          action.payload.rank
        )
      );

    case Types.SHOW_ERROR_PROMPT:
      return state.set("errorPrompt", true);

    case Types.HIDE_ERROR_PROMPT:
      return state.set("errorPrompt", false);

    case Types.SOLVE:
      clearWinnerState(plainState);
      let hands = plainState.players
        .filter((player) => {
          return !_.isEmpty(player.cards[0]) && !_.isEmpty(player.cards[1]);
        })
        .map((player) => {
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
