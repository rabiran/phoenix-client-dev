import React, { useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import SearchBarPerson from "../SearchBarPerson";
import SoldierForm from "./SoldierForm";
import styles from "./soldierScreen.style";
import Avatar from "../../../components/shared/Avatar/index";
import {
  fetchSoldierRequest,
  selectErrors,
  selectPerson,
  resetData,
  selectIsFetching,
  fetchSoldierError,
} from "../../../features/apiComponents/editSoldierTab/editSoldierTabSlice";
import { useHistory, Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, InputLabel, Link } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import { useEffect } from "react";
// import faker from "faker";

const errorMessage = "לא נמצא חייל העונה למ.א שהוזן";
const personalNumberTitle = "מספר אישי:";
const searchBarTitle = "הקלד מספר אישי להשלמת פרטי החייל:";
const updateLinkMessage = "חיפוש חדש";

export default function SoldierScreen({ personalNumber }) {
  // jss styles
  const classes = styles();
  const dispatch = useDispatch();
  let history = useHistory();
  // Props from redux
  const fetchInProgress = useSelector(selectIsFetching);
  const { searchSoldierError } = useSelector(selectErrors);
  const person = useSelector(selectPerson)
  const showError = !_.isEmpty(searchSoldierError) && !fetchInProgress;

  // if already editing a person, hide the search input
  const displaySearchInput = !personalNumber || _.isEmpty(person);

  // Whether personalNumber has changed, fetch person from kartoffel
  useEffect(() => {
    if (personalNumber) {
      dispatch(fetchSoldierRequest({ personalNumber }));
    } 
  }, [personalNumber, dispatch]);
  
  //set focus on search Input
  const searchInputRef = useRef(null);
  useEffect(() => {
    if(searchInputRef.current && (displaySearchInput || showError)) {
      searchInputRef.current.focus();
    }
  }, [displaySearchInput, showError])

  const triggerSearch = personalNumberInput => {
    history.push(`/editPerson/${personalNumberInput}`);
  }

  // 
  const pnSearchOrDisplay = displaySearchInput ? 
    <div>
      <SearchBarPerson
        ref={searchInputRef}
        onClickSearch={triggerSearch}
        disabled={fetchInProgress}
      />
      {fetchInProgress && <LinearProgress/>} 
    </div> :
    <div className={classes.personalNumberDetails}>
      <InputLabel className={classes.inputLabel} disabled={true}>
        {personalNumberTitle}
      </InputLabel>
      <InputLabel className={classes.inputLabel}>{personalNumber}</InputLabel>
      <Link
        underline="always"
        className={classes.updateLink}
        component={RouterLink}
        to='/editPerson'
        onClick={() => dispatch(resetData())}
      >
        {updateLinkMessage}
      </Link>
    </div>

  return (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar
          rootClassAvatar={classes.avatarRoot}
          uploadImage={!_.isEmpty(person)}
          badge="setting"
        />
      </div>
      <div className={classes.SearchBarPersonContainer}>
        <div className={classes.titleSearchBar}>
          <span>{searchBarTitle}</span>
        </div>
        <div className={classes.containerSearch}>
          {pnSearchOrDisplay}
          {showError && (<span>
              <Typography
                color={"secondary"}
                variant={"subtitle2"}
                classes={{
                  root: classes.errorMessageRoot,
                  subtitle2: classes.errorMessageSubtitle2,
                }}
              >
                {errorMessage}
              </Typography>
            </span>)}          
        </div>
      </div>
      <SoldierForm soldier={person} disabled={displaySearchInput} />
    </div>
  );
};

SoldierScreen.propTypes = {
  /**
   * personalNumber of person
   */
  personalNumber: PropTypes.string,
};
