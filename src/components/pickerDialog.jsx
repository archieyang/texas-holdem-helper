import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import RadioButtonGroup from "./radioButtonGroup";
import { Rank, Suit } from "../data/cardData";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class RadioItem {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}

const suit = [
  new RadioItem(Suit.HEART, "红桃"),
  new RadioItem(Suit.DIAMOND, "方片"),
  new RadioItem(Suit.SPADE, "黑桃"),
  new RadioItem(Suit.CLUB, "草花"),
];

const rank = Object.values(Rank).map((item) => {
  return new RadioItem(item, item);
});

class PickerDialog extends Component {
  render() {
    return (
      <Dialog
        fullScreen
        open={this.props.open}
        onClose={this.props.handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.props.handleClose}
            aria-label="close"
          />
          <Typography variant="h6">重新选牌</Typography>
          <Button autoFocus color="inherit" onClick={this.props.handleClose}>
            保存
          </Button>
        </Toolbar>
        <RadioButtonGroup
          handleChange={this.props.handleSuitChange}
          items={suit}
          default={this.props.editing.default.suit}
        />

        <RadioButtonGroup
          handleChange={this.props.handleRankChange}
          items={rank}
          default={this.props.editing.default.rank}
        />
      </Dialog>
    );
  }
}

export default PickerDialog;

// export default function PickerDialog(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

// }
