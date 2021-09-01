import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { Hearts, Diamonds, Spades, Clubs } from "../data/cardData";
import Cards from "./cards";

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PickerDialog = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Transition}
      className={classes.root}
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
        <Cards cards={Hearts} onCardClick={props.onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Cards cards={Diamonds} onCardClick={props.onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Cards cards={Spades} onCardClick={props.onCardClick} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Cards cards={Clubs} onCardClick={props.onCardClick} />
      </TabPanel>
    </Dialog>
  );
};

export default PickerDialog;
