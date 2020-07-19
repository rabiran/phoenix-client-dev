import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import SearchBarPerson from "../SearchBarPerson";
import SoldierForm from "./SoldierForm";
import styles from "./soldierScreen.style";
import Avatar from "../../../components/shared/Avatar/index";
import {
  fetchSoldierRequest,
  getLoadings,
  getErrors,
  getPerson,
} from "../../../features/apiComponents/editSoldierTab/editSoldierTabSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, InputLabel, Link } from "@material-ui/core";
// import faker from "faker";

/**
 * tab of soldier
 */
export default function SoldierScreen({ personalNumber }) {
  const errorMessage = "לא נמצא חייל העונה למ.א שהוזן";
  const personalNumberTitle = "מספר אישי:";
  const searchBarTitle = "הקלד מספר אישי להשלמת פרטי החייל:";
  const updateLinkMessage = "עדכן";
  // jss styles
  const classes = styles();
  const dispatch = useDispatch();
  let history = useHistory();
  // Props from redux
  const { fetchInProgress, searchSoldierError, person } = useSelector(
    (state) => {
      const person = getPerson(state);
      return {
        ...getLoadings(state),
        ...getErrors(state),
        person,
      };
    }
  );
  // Allowing to search soldier
  const [personEditable, setPersonEditable] = useState(true);
  // Whether personalNumber has changed, fetch person from kartoffel
  useMemo(() => {
    if (personalNumber) {
      dispatch(fetchSoldierRequest({ personalNumber: personalNumber }));
    }
  }, [personalNumber, dispatch]);
  const [soldier, setSoldier] = useState(person);
  // Whether data changed, update soldier state and disable option to search
  useMemo(() => {
    setSoldier(person);
    !_.isEmpty(person) && setPersonEditable(false);
  }, [person]);
  /**
   * Function to search person
   * if personalNumber equal to previous disabled search and dont research
   * if the inputText empty, enable search
   * else editPerson/{inputText}
   * @param {string} inputText the personalNumber to search
   */
  const handleSearch = (inputText) => {
    if (inputText) {
      if (inputText === personalNumber && soldier.personalNumber === personalNumber) {
        setPersonEditable(false);
      } else {
        history.push(`/editPerson/${inputText}`);
      }
    } else {
      setPersonEditable(true);
    }
  };

  let searchBarOrUpdate;

  // If enable to search person
  if (personEditable || _.isEmpty(soldier)) {
    searchBarOrUpdate = (
      <>
        <SearchBarPerson
          person={soldier}         
          onClickSearch={handleSearch}
          loading={fetchInProgress}
        />
        <div>
          {!_.isEmpty(searchSoldierError) && !fetchInProgress && (
            <span>
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
            </span>
          )}
        </div>
      </>
    );
    // In case the person selected
  } else {
    searchBarOrUpdate = (
      <div className={classes.personalNumberDetails}>
        <InputLabel className={classes.inputLabel} disabled={true}>
          {personalNumberTitle}
        </InputLabel>
        <InputLabel className={classes.inputLabel}>{personalNumber}</InputLabel>
        <Link
          underline="always"
          className={classes.updateLink}
          onClick={() => handleSearch("")}
        >
          {updateLinkMessage}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar
          rootClassAvatar={classes.avatarRoot}
          uploadImage={!_.isEmpty(soldier)}
          badge="setting"
        />
      </div>
      <div className={classes.SearchBarPersonContainer}>
        <div className={classes.titleSearchBar}>
          <span>{searchBarTitle}</span>
        </div>
        <div className={classes.containerSearch}>
          {searchBarOrUpdate}          
        </div>
      </div>
      <SoldierForm soldier={soldier} disabled={personEditable} />
    </div>
  );
};

SoldierScreen.propTypes = {
  /**
   * personalNumber of person
   */
  personalNumber: PropTypes.string,
};
