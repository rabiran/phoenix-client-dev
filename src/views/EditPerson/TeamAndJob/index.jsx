import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import TreeList from "../../../components/groups/groupTree";
import {
  TextField,
  InputAdornment,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Divider,
  ClickAwayListener,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import styles from "./TeamAndJob.style";

export default ({ formInputs, onChangeHandle, personDetails, disabled }) => {
  const rootIds = useSelector((state) => state.groups.rootGroupsIds);
  const [treeExpanded, setTreeExpanded] = useState(rootIds);
  const [treeSelected, setTreeSelected] = useState(null);
  const groupById = useSelector((state) => state.groups.byId[treeSelected]);
  const [expentionExtended, setExpentionExtended] = useState(false);
  const [hierarchyDisplay, setHierarchyDisplay] = useState("בחר צוות");
  const handleExpandedChange = (e, nodes) => setTreeExpanded(nodes);
  const handleSelection = (e, node) => {
    const event = { target: { name: "directGroup", value: node } };
    onChangeHandle(event);
    setTreeSelected(node);
  };
  useEffect(() => {
    setTreeExpanded(rootIds);
  }, [rootIds]);
  useEffect(() => {
    setExpentionExtended(false);
    setTreeSelected(null);
  }, [personDetails]);
  useEffect(() => {
    let hierarchyDisplay = _.isEmpty(personDetails)
      ? "בחר צוות"
      : groupById
      ? groupById.hierarchy.concat(groupById.name).join(" / ")
      : !_.isEmpty(personDetails)
      ? personDetails.hierarchy.join(" / ")
      : null
    setHierarchyDisplay(hierarchyDisplay);
  }, [groupById, personDetails]);
  const classes = styles();

  let disabledInput = disabled || _.isEmpty(personDetails);
  return (
    <div className={classes.teamAndJobContainer}>
      <div className={classes.expansionPanelContainer}>
        <span>
          <strong>צוות ותפקיד</strong> השלם את הפרטים הבאים:
        </span>
        <ClickAwayListener onClickAway={() => setExpentionExtended(false)}>
          <ExpansionPanel
            onChange={(e, exp) => {
              setExpentionExtended(exp);
            }}
            expanded={expentionExtended}
            disabled={disabledInput}
            classes={{
              root: classes.expansionPanelRoot,
              rounded: classes.expansionPanelRounded,
              expanded: classes.expansionPanelExpanded,
            }}
          >
            <ExpansionPanelSummary
              classes={{
                root: classes.expansionPanelSummaryRoot,
                expanded: classes.expansionPanelSummaryExpanded,
                focused: classes.expansionPanelSummaryFocused,
              }}
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{hierarchyDisplay}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              classes={{
                root: classes.expendDetails,
              }}
            >
              <div className={classes.treeGroupsTitle}>
                <span>בחר מחלקה אליה מגיע החייל</span>
                <Link color="inherit" underline="none">
                  + הוסף מחלקה
                </Link>
              </div>
              <Divider />
              <div className={classes.treeGroups}>
                <TreeList
                  itemHeight={26}
                  selected={treeSelected}
                  onNodeSelected={handleSelection}
                  expanded={treeExpanded}
                  onNodeToggle={handleExpandedChange}
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </ClickAwayListener>
      </div>
      <div className={classes.descriptionContainer}>
        <TextField
          onChange={onChangeHandle}
          name="job"
          value={formInputs.job.value}
          disabled={disabledInput}
          placeholder="הקלד תפקיד"
          InputProps={{
            classes: { input: classes.input},
            startAdornment: (
              <InputAdornment position="start">תפקיד:</InputAdornment>
            ),
          }}
        />
        <TextField
          onChange={onChangeHandle}
          name="description"
          value={formInputs.description.value}
          disabled={disabledInput}
          placeholder="הקלד פה תיאור תפקיד"
          InputProps={{
            classes: {input: classes.input},
            startAdornment: (
              <InputAdornment position="start">תיאור:</InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};
