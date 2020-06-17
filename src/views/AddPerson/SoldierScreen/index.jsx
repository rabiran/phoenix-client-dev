import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import SearchBarPerson from "../SearchBarPerson";
import SoldierForm from "./SoldierForm";
import styles from "./soldierScreen.style";
import Avatar from "../../../components/shared/Avatar/index";
import { loadSoldierLoading } from "../../../features/apiComponents/addSoldierTab/addSoldierTabSlice";
import { useHistory } from "react-router-dom";
// import faker from "faker";

export default ({ personalNumber }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { loadingSearch, errorSearch, data } = useSelector(
    (state) => state.component.addSoldierTab
  );
  useMemo(() => {
    if (personalNumber) {
      dispatch(loadSoldierLoading({ personalNumber: personalNumber }));
    }
  }, [personalNumber, dispatch]);
  const [soldier, setSoldier] = useState(data);
  useMemo(() => {
    setSoldier(data);
  }, [data]);
  const classes = styles();
  const handleSearch = (inputText) => {
    if (inputText) {
      if (inputText === personalNumber) {
        dispatch(loadSoldierLoading({ personalNumber: inputText }));
      } else {
        history.push(`/addPerson/${inputText}`);
      }
    } else {
      setSoldier({});
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
          onClickSearch={handleSearch}
          loading={loadingSearch}
          error={errorSearch}
          errorMessage={"לא נמצא חייל העונה למ.א שהוזן"}
        />
      </div>
      <SoldierForm soldier={soldier} />
    </div>
  );
};
