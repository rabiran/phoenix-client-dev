import React from "react";
import SearchBarPerson from "../SearchBarPerson";
import PersonalInfo from "../PersonalInfo";
import TeamAndJob from "../TeamAndJob";
import styles from "./SoldierForm.style";

export default props => {
  const classes = styles();

  return (
    <div>
      <form>
        <div className={classes.SearchBarPersonContainer}>
          <SearchBarPerson
            person={props.person}
            onClickSearch={props.onClickSearch}
          />
        </div>
        <PersonalInfo />
        <TeamAndJob />
      </form>
    </div>
  );
};
