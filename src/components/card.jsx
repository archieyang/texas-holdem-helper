import React, { Component } from "react";
import Poker from "../dep/poker";
import _ from 'lodash'

const size = 100;
class Card extends Component {
  state = { showDialog: false };
  constructor(props) {
    super(props);
  }

  render() {
    let { card } = this.props;
    let data =
      _.isEmpty(card)
        ? Poker.getBackData(size)
        : Poker.getCardData(size, card.suit, card.rank);
    return <img src={data} onClick={this.props.onClick} />;
  }
}

export default Card;
