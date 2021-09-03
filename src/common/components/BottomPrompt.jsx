import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { hideErrorPrompt } from "../../features/solver/solverSlice";
import { useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BottomPrompt = ({ message }) => {
  const dispatch = useDispatch();

  const onHideErrorPrompt = () => {
    dispatch(hideErrorPrompt());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={message !== undefined && message !== null}
      autoHideDuration={3000}
      onClose={onHideErrorPrompt}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
};

export default BottomPrompt;
