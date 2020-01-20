import React from "react";
import SearchBarPerson from "../SearchBarPerson";
// import styles from "./PersonDetails.style";

export default (props) => {
  return (
    <>
      <SearchBarPerson 
        person={props.person}
        onClickSearch={props.onClickSearch}
      />
      
    </>
  );
};
