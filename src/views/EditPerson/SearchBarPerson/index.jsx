import React, { useState, useMemo } from "react";
import _ from "lodash";
import {
  Link,
  InputLabel,
  InputBase,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import styles from "./searchBarPerson.styles";
import StyledButton from "../../../components/shared/styleComponent/StyleButton";
import PropTypes from "prop-types";


export default function SearchBarPerson({ onClickSearch, person, loading, error, errorMessage, enableSearch }) {
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
  useMemo(()=> {
    if(!_.isEmpty(person)) {
      setPersonalNumber(person.personalNumber)}
    },[person]);
  
  // Control value in input  
  const handleChangeInput = (event) => {
    if (/^\d{0,9}$/.test(event.target.value)) {
      setPersonalNumber(event.target.value);
      setErrorLabel("");
    }
    if (!/^\d{5,9}$/.test(event.target.value)) {
      setErrorLabel("יש להכניס 6-9 ספרות בלבד!");
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && errorLabel === "") {
      handleSearch(personalNumber);
    }
  };

  let display;

  // If enable to search person
  if (enableSearch || _.isEmpty(person)) {
    display = (
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
        {!_.isEmpty(error) && !loading && (
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
    );
    // In case the person selected
  } else {
    display = (
      <div className={classes.personalNumberDetails}>
        <InputLabel className={classes.inputLabel} disabled={true}>
          מספר אישי:
        </InputLabel>
        <InputLabel className={classes.inputLabel}>{personalNumber}</InputLabel>
        <Link
          underline="always"
          className={classes.updateLink}
          onClick={() => handleSearch("")}
        >
          עדכן
        </Link>
      </div>
    );
  }
  return (
    <div className={classes.searchBarContainer}>
      <div className={classes.titleLabel}>
        <span>הקלד מספר אישי להשלמת פרטי החייל:</span>
      </div>
      {display}
    </div>
  );
};

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
  /**
   * object error if fetch person is wrong
   */
  error: PropTypes.object, 
  /**
   * What to write if get error from Kartoffel
   */
  errorMessage: PropTypes.string, 
  /**
   * Indicate if enable search
   */
  enableSearch: PropTypes.bool  
};
