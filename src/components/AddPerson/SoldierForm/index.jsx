import React from "react";
import SearchBarPerson from "../SearchBarPerson";
import PersonalInfo from '../PersonalInfo';

export default props => {
  return (
    <div>
      <form>
        <SearchBarPerson
          person={props.person}
          onClickSearch={props.onClickSearch}
        />
        <PersonalInfo
          
        />
      </form>
    </div>
  );
};
