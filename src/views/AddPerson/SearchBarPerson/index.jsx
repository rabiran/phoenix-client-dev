import React, { useState } from "react";
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
import { useMemo } from "react";

export default ({ onClickSearch, person, loading, error, errorMessage }) => {
  const [personalNumber, setPersonalNumber] = useState(
    !_.isEmpty(person) ? person.personalNumber : ""
  );
  const [errorLabel, setErrorLabel] = useState("");
  const classes = styles();
  const handleSearch = (prsnlNmbr) => {
    onClickSearch(prsnlNmbr);
  };

  useMemo(()=> {
    if(!_.isEmpty(person)) {
      setPersonalNumber(person.personalNumber)}
    },[person]);
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

  if (_.isEmpty(person)) {
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
