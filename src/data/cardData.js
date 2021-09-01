export const Suit = {
  HEART: "h",
  DIAMOND: "d",
  SPADE: "s",
  CLUB: "c",
};

export const Rank = {
  ACE: "A",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
  JACK: "J",
  QUEEN: "Q",
  KING: "K",
};

export const Hearts = Object.entries(Rank).map((key) => {
  return { suit: Suit.HEART, rank: key[1] };
});

export const Diamonds = Object.entries(Rank).map((key) => {
  return { suit: Suit.DIAMOND, rank: key[1] };
});

export const Spades = Object.entries(Rank).map((key) => {
  return { suit: Suit.SPADE, rank: key[1] };
});

export const Clubs = Object.entries(Rank).map((key) => {
  return { suit: Suit.CLUB, rank: key[1] };
});

export const Default = { suit: Suit.HEART, rank: Rank.ACE };
