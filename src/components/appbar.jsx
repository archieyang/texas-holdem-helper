import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ResetIcon from "@material-ui/icons/RotateLeft";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
const Appbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Texas Hold'em Helper
          </Typography>
          <IconButton
            onClick={props.onAddClick}
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
            onClick={props.onResetClick}
          >
            <ResetIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
