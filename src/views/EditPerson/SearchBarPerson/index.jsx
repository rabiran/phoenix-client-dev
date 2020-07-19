import React, { useState, useMemo } from "react";
import _ from "lodash";
import { 
  InputBase,
  CircularProgress, 
} from "@material-ui/core";
import styles from "./searchBarPerson.styles";
import StyledButton from "../../../components/shared/styleComponent/StyleButton";
import PropTypes from "prop-types";

export default function SearchBarPerson({
  onClickSearch,
  person,
  loading,
}) {
  // jss style
  const classes = styles();
  // value in input search
  const [personalNumber, setPersonalNumber] = useState(
    !_.isEmpty(person) ? person.personalNumber : ""
  );
  // Error lable to input
  const [errorLabel, setErrorLabel] = useState("");
  // handleSearch...
  const handleSearch = (prsnlNmbr) => {
    onClickSearch(prsnlNmbr);
  };
  // Whether person changed, update personalNumber in input Search
  useMemo(() => {
    if (!_.isEmpty(person)) {
      setPersonalNumber(person.personalNumber);
    }
  }, [person]);

  // Control value in input
  const handleChangeInput = (event) => {
    // Check if change value in input
    if (/^\d{0,9}$/.test(event.target.value)) {
      setPersonalNumber(event.target.value);
      setErrorLabel("");
    }
    // Check if correct value
    if (!/^\d{5,9}$/.test(event.target.value)) {
      setErrorLabel("יש להכניס 6-9 ספרות בלבד!");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && errorLabel === "") {
      handleSearch(personalNumber);
    }
  };
  return (
    <div className={classes.containerSearch}>
      <div className={classes.SearchInput}>
        <InputBase
          value={personalNumber}
          onChange={handleChangeInput}
          className={classes.root}
          placeholder={"הקלד מספר אישי"}
          onKeyUp={handleKeyUp}
        />
        <span className={classes.errorLabel}>{errorLabel}</span>
      </div>
      <StyledButton
        onClick={() => handleSearch(personalNumber)}
        disabled={errorLabel !== ""}
      >
        חפש
      </StyledButton>
      {loading && <CircularProgress />}
    </div>
  );
}

SearchBarPerson.propTypes = {
  /**
   * Function to search
   */
  onClickSearch: PropTypes.func.isRequired,
  /**
   * the Person Object
   */
  person: PropTypes.object,
  /**
   * indicate if fetch person from Kartoffel
   */
  loading: PropTypes.bool,  
};
