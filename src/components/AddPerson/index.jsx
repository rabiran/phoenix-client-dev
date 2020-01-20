import React from "react";
import styles from "./AddPerson.styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SoldierForm from "./SoldierForm";
import persons from "../../assets/mock.json";

//
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
//

export default function AddPerson() {
  const classes = styles();
  const [value, setValue] = React.useState(0);
  const [currPerson, setCurrPerson] = React.useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = inputText => {
    setCurrPerson(
      persons.find(person => person.personalNumber === inputText) || {}
    );
  };

  return (
    <div className={classes.AddPerson}>
      <div className={classes.tabContent}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <SoldierForm person={currPerson} onClickSearch={handleSearch} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          Item Two
        </TabPanel>
      </div>
      {/*       <Tabs>
        <Tab label="Kartoffel"></Tab>
        <Tab label="Karting"></Tab>
        <Tab label="Spike"></Tab>
      </Tabs> */}
    </div>
  );
}

////////////////////////////////////////////////////////////////

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

// const useStyles = makeStyles(theme => ({
//   /*   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper
//   }, */
//   AddPerson: {
//     backgroundImage: `url(${bg})`,
//     height: "100%",
//     width: "100%",
//     position: "fixed",
//     display: "flex",
//     justifyContent: "center"
//   },
//   tabContent: {
//     position: "relative",
//     top: "120px",
//     width: "60%",
//     minWidth: "478px"
//   },
//   tabPanel: {
//     borderRadius: "10px 0 10px 10px",
//     backgroundColor: "rgb(183, 204, 183)"
//   }
// }));
