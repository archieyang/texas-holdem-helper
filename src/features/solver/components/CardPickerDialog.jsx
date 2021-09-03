import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { Hearts, Diamonds, Spades, Clubs } from "../../../data/cardData";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Cards from "./Cards";
import { useDispatch } from "react-redux";
import { finishEditing } from "../solverSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="Content"
      style={{ height: "100%" }}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CardPickerDialog = ({ open }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const onCardClick = ({ card }) => {
    dispatch(finishEditing(card));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      TransitionComponent={Transition}
      aria-labelledby="responsive-dialog-title"
    >
      <AppBar position="static">
        <Tabs
          value={value}
          aria-label="simple tabs example"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label="红桃" {...a11yProps(0)} />
          <Tab label="方片" {...a11yProps(1)} />
          <Tab label="黑桃" {...a11yProps(2)} />
          <Tab label="草花" {...a11yProps(3)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Cards cards={Hearts} onClick={onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cards cards={Diamonds} onClick={onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Cards cards={Spades} onClick={onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cards cards={Clubs} onClick={onCardClick} />
      </TabPanel>
    </Dialog>
  );
};

export default CardPickerDialog;
