import React from "react";
import _ from 'lodash';
import SearchBarPerson from "../SearchBarPerson";
import SoldierForm from './SoldierForm';
import styles from "./soldierScreen.style";
import Avatar from "../../Avatar/index";
// import faker from "faker";

export default ({person, onClickSearch}) => {
  const classes = styles();
  return (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar rootClassAvatar={classes.avatarRoot} uploadImage={!_.isEmpty(person)} />
      </div>
      <div className={classes.SearchBarPersonContainer}>
        <SearchBarPerson
          person={person}
          onClickSearch={onClickSearch}
        />
      </div>
      <SoldierForm soldier={person}/>
    </div>
  );
};
