import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/RotateLeft";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { reset, addPlayer } from "../solverSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));
const Appbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onResetClicked = () => {
    dispatch(reset());
  };

  const onAddClick = () => {
    dispatch(addPlayer());
  };
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Texas Hold'em Helper
        </Typography>
        <IconButton
          onClick={onAddClick}
          edge="start"
          className={classes.iconButton}
          color="inherit"
        >
          <AddIcon />
        </IconButton>

        <IconButton
          edge="start"
          className={classes.iconButton}
          color="inherit"
          onClick={onResetClicked}
        >
          <ResetIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
