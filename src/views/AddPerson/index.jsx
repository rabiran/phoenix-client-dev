import React, { useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { styles, tabItemStyles } from "./addPerson.style";
import SoldierScreen from "./SoldierScreen";
import persons from "../../assets/mock.json";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function AddPerson() {
  const tabStyles = tabItemStyles();
  const classes = styles();
  const [value, setValue] = useState(0);
  const [currPerson, setCurrPerson] = useState({});
  // const persons = useSelector((state) => state.persons.byIds);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = (inputText) => {
    if (inputText) {
      setCurrPerson(
        persons.find((person) => person.personalNumber === inputText) || {}
      );
    } else {
      setCurrPerson({});
    }
  };

  return (
    <div className={classes.AddPerson}>
      <div className={classes.background}></div>
      <div className={classes.tabContent}>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab label="חייל" disableRipple classes={tabStyles} />
          <Tab label="אזרח" disableRipple classes={tabStyles} />
        </Tabs>
        <TabPanel className={classes.tabPanel} value={value} index={0}>
          <SoldierScreen person={currPerson} onClickSearch={handleSearch} />
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          Civilian in process...
        </TabPanel>
      </div>
    </div>
  );
}

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
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
