import { Types } from "../action";
import { fromJS } from "immutable";
import _ from "lodash";
import { Hand } from "pokersolver";
import { Suit, Rank } from "../data/cardData";

const initState = fromJS({
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
      if (_.isEqual(cards[i], cards[j]) && !_.isEmpty(cards[i])) {
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
        return player;
      });
      plainState.community = [{}, {}, {}, {}, {}];
      return fromJS(plainState);
    case Types.ADD_PLAYER:
      return fromJS(clearWinnerState(plainState)).updateIn(
        ["players"],
        (players) => players.push(fromJS({ cards: [{}, {}] }))
      );
    case Types.DELETE_PLAYER:
      return validate(
        state.updateIn(["players"], (arr) =>
          arr.splice(action.payload.playerIndex, 1)
        )
      );
    case Types.START_EDITING:
      return state
        .set("editing", fromJS(action.payload))
        .set("showDialog", true);

    case Types.CARD_CHANGED:
      return validate(
        setCard(
          setCard(
            fromJS(clearWinnerState(plainState)),
            "suit",
            action.payload.suit
          ),
          "rank",
          action.payload.rank
        )
      ).set("showDialog", false);

    case Types.HIDE_ERROR_PROMPT:
      return state.delete("errorPrompt");

    case Types.SOLVE:
      clearWinnerState(plainState);

      if (state.get("isValid") === false) {
        return state.set("errorPrompt", "Duplicate cards");
      }

      let containsEmptyCard = false;

      let hands = plainState.players.map((player) => {
        let cards = [...plainState.community];
        player.cards.forEach((item) => {
          if (!_.isEmpty(item)) {
            cards.push(item);
          } else {
            containsEmptyCard = true;
          }
        });

        return containsEmptyCard ? {} : Hand.solve(convertToString(cards));
      });

      if (containsEmptyCard) {
        return state.set("errorPrompt", "Empty cards");
      }

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