import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import SearchBarPerson from "../SearchBarPerson";
import SoldierForm from "./SoldierForm";
import styles from "./soldierScreen.style";
import Avatar from "../../../components/shared/Avatar/index";
import { loadSoldierLoading } from "../../../features/apiComponents/addSoldierTab/addSoldierTabSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// import faker from "faker";

/**
 * tab of soldier
 */
export default function SoldierScreen({ personalNumber }) {
  // jss styles
  const classes = styles();
  const dispatch = useDispatch();
  let history = useHistory();
  // Props from redux
  const { loadingSearch, errorSearch, data } = useSelector(
    (state) => state.component.addSoldierTab
  );
  // Allowing to search soldier
  const [switchPerson, setSwitchPerson] = useState(true);
  // Whether personalNumber has changed, fetch person from kartoffel 
  useMemo(() => {
    if (personalNumber) {      
      dispatch(loadSoldierLoading({ personalNumber: personalNumber }));
    }
  }, [personalNumber, dispatch]);
  const [soldier, setSoldier] = useState(data);
  // Whether data changed, update soldier state and disable option to search
  useMemo(() => {
    setSoldier(data);
    !_.isEmpty(data) && setSwitchPerson(false);
  }, [data]);
  /**
   * Function to search person
   * if personalNumber equal to previous disabled search and dont research
   * if the inputText empty, enable search
   * else editPerson/{inputText}  
   * @param {string} inputText the personalNumber to search
   */
  const handleSearch = (inputText) => {
    if (inputText) {
      if (inputText === personalNumber) {        
        setSwitchPerson(false);
      } else {
        history.push(`/editPerson/${inputText}`);
      }
    } else {
      setSwitchPerson(true);
    }
  };
  return (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar
          rootClassAvatar={classes.avatarRoot}
          uploadImage={!_.isEmpty(soldier)}
        />
      </div>
      <div className={classes.SearchBarPersonContainer}>
        <SearchBarPerson
          person={soldier}
          enableSearch={switchPerson}
          onClickSearch={handleSearch}
          loading={loadingSearch}
          error={errorSearch}
          errorMessage={"לא נמצא חייל העונה למ.א שהוזן"}
        />
      </div>
      <SoldierForm soldier={soldier} disabled={switchPerson}/>
    </div>
  );
};

SoldierScreen.propTypes = {
  /**
   * personalNumber of person
   */
  personalNumber: PropTypes.string, 
};