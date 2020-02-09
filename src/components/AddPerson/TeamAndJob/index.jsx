import React from "react";
import {
  TextField,
  InputAdornment,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import styles from "./TeamAndJob.style";

export default props => {
  const classes = styles();

  return (
    <div className={classes.teamAndJobContainer}>
      <div className={classes.expansionPanelContainer}>
        <span>
          <strong>צוות ותפקיד</strong> השלם את הפרטים הבאים:
        </span>
        <ExpansionPanel
          classes={{
            root: classes.expansionPanelRoot,
            rounded: classes.expansionPanelRounded,
            expanded: classes.expansionPanelExpanded
          }}
        >
          <ExpansionPanelSummary
            classes={{
              root: classes.expansionPanelSummaryRoot,
              expanded: classes.expansionPanelSummaryExpanded
            }}
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>בחר צוות</Typography>
          </ExpansionPanelSummary>
          {/* <Divider /> */}
          <ExpansionPanelDetails
            classes={{
              root: classes.expendDetails
            }}
          >
            <div className={classes.treeGroupsTitle}>
              <span>בחר מחלקה אליה מגיע החייל</span>
              <Link 
                color='inherit'
                underline='none'
              >+ הוסף מחלקה</Link>
            </div>
            <Divider />
            <div className={classes.treeGroups}></div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.descriptionContainer}>
        <TextField
          placeholder="הקלד תפקיד"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תפקיד:</InputAdornment>
            )
          }}
        />
        <TextField
          placeholder="הקלד פה תיאור תפקיד"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תיאור:</InputAdornment>
            )
          }}
        />
      </div>
    </div>
  );
};
