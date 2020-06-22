import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { styles, tabItemStyles } from "./editPerson.style";
import SoldierScreen from "./SoldierScreen";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";

/**
 * Screen of edit person
 */
export default function EditPerson() {
  // jss Styles
  const tabStyles = tabItemStyles();
  const classes = styles();
  // Handle toggle tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Extract parameter from URL
  const { personalNumber } = useParams();
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
          <SoldierScreen personalNumber={personalNumber}/>
        </TabPanel>
        <TabPanel className={classes.tabPanel} value={value} index={1}>
          Civilian in process...
        </TabPanel>
      </div>
    </div>
  );
}

/**
 * From materialUI examples. it's show only tab that selected
 */
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

EditPerson.propTypes = {
  
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
