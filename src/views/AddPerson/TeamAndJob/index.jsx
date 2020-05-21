import React from "react";
import _ from "lodash";
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

export default ({ formInputs, onChangeHandle, personDetails }) => {
  const classes = styles();
  let disabled = _.isEmpty(personDetails);
  return (
    <div className={classes.teamAndJobContainer}>
      <div className={classes.expansionPanelContainer}>
        <span>
          <strong>צוות ותפקיד</strong> השלם את הפרטים הבאים:
        </span>
        <ExpansionPanel
          disabled={disabled}
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
          <ExpansionPanelDetails
            classes={{
              root: classes.expendDetails
            }}
          >
            <div className={classes.treeGroupsTitle}>
              <span>בחר מחלקה אליה מגיע החייל</span>
              <Link color="inherit" underline="none">
                + הוסף מחלקה
              </Link>
            </div>
            <Divider />
            <div className={classes.treeGroups}></div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.descriptionContainer}>
        <TextField
          onChange={onChangeHandle}
          name="job"
          value={formInputs.job.value}
          disabled={disabled}
          placeholder="הקלד תפקיד"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תפקיד:</InputAdornment>
            )
          }}
        />
        <TextField
          onChange={onChangeHandle}
          name="description"
          value={formInputs.description.value}
          disabled={disabled}
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
