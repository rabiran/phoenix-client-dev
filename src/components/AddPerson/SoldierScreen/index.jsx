import React from "react";
import SearchBarPerson from "../SearchBarPerson";
import PersonalInfo from "../PersonalInfo";
import TeamAndJob from "../TeamAndJob";
import styles from "./soldierScreen.style";
import { ButtonBase } from "@material-ui/core";
import Avatar from "../../Avatar/index";
import StyledButton from '../../withStylesComponents/StyleButton'
import faker from 'faker';

export default props => {
  const classes = styles();

  return (
    <div>
      <div className={classes.avatarContainer}>
        <Avatar rootClassAvatar={classes.avatarRoot} uploadImage/>
      </div>
      <div className={classes.SearchBarPersonContainer}>
        <SearchBarPerson
          person={props.person}
          onClickSearch={props.onClickSearch}
        />
      </div>
      <form>
        <PersonalInfo />
        <TeamAndJob />
        <div className={classes.submitContainer}>
          <StyledButton>
            העבר לאישור קב"ט
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
