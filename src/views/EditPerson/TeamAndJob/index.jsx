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
import PropTypes from "prop-types";

export default function TeamAndJob({ formInputs, onChangeHandle, personDetails, disabled }) {
  // jss style
  const classes = styles();
  // RootId of tree from redux
  const rootIds = useSelector((state) => state.groups.rootGroupsIds);
  // Array of expended in tree
  const [treeExpanded, setTreeExpanded] = useState(rootIds);
  // Selected group 
  const [treeSelected, setTreeSelected] = useState(null);
  // expended expention toggle
  const [expentionExtended, setExpentionExtended] = useState(false);
  // group of person from redux
  const groupById = useSelector((state) => state.groups.byId[treeSelected]);
  const [hierarchyDisplay, setHierarchyDisplay] = useState("בחר צוות");
  const handleExpandedChange = (e, nodes) => setTreeExpanded(nodes);
  // Wether select group is change in input and tree 
  const handleSelection = (e, node) => {
    const event = { target: { name: "directGroup", value: node } };
    onChangeHandle(event);
    setTreeSelected(node);
  };
  // When are rootids loadded in redux, the tree expend them
  useEffect(() => {
    setTreeExpanded(rootIds);
  }, [rootIds]);
  // when are personalDetails changed, the expention closed
  useEffect(() => {    
    setTreeSelected(null);
  }, [personDetails]);
  // hierarchy display changed acording to group of person and selected 
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

  // Indicate if disabled input
  let disabledInput = disabled || _.isEmpty(personDetails);
  return (
    <div className={classes.teamAndJobContainer}>
      <div className={classes.expansionPanelContainer}>
        <span>
          <strong>צוות ותפקיד</strong> השלם את הפרטים הבאים:
        </span>
        {/* Closed expention if click away */}
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

TeamAndJob.propTypes = {
  /**
   * values of fields
   */
  formInputs: PropTypes.object, 
  /**
   * function to handle input
   */
  onChangeHandle: PropTypes.func, 
  /**
   * person object from Kartoffel
   */
  personDetails: PropTypes.object, 
  /**
   * Indicate to disabled inputs 
   */
  disabled: PropTypes.bool
};
