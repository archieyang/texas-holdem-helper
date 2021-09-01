import React, { Component } from "react";
import Poker from "../dep/poker";
import _ from "lodash";

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { card } = this.props;
    let data = _.isEmpty(card)
      ? Poker.getBackData(200)
      : Poker.getCardData(200, card.suit, card.rank);
    return (
      <img src={data} onClick={this.props.onClick} height={this.props.height} />
    );
  }
}

export default Card;
