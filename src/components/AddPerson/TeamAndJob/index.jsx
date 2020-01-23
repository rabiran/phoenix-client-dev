import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import styles from "./TeamAndJob.style";
import clsx from 'clsx';

export default props => {
  const [personalNumber, setPersonalNumber] = React.useState("");
  const [errorLabel, setErrorLabel] = React.useState("");
  const classes = styles();
  const handleSearch = () => {
    props.onClickSearch(personalNumber);
  };

  const handleChangeInput = event => {
    if (/^\d{0,9}$/.test(event.target.value)) {
      setPersonalNumber(event.target.value);
      setErrorLabel("");
    } else {
      setErrorLabel("יש להכניס 6-9 ספרות בלבד!");
    }
  };

  const handleKeyUp = event => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={classes.teamAndJobContainer}>
      <div>
        <span>
          <strong>צוות ותפקיד</strong> השלם את הפרטים הבאים:
        </span>
      </div>
      <div className={classes.descriptionContainer}>
        <TextField
          placeholder="הקלד תפקיד"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תפקיד:</InputAdornment>
            )
          }}
        />
        <TextField
          placeholder="הקלד פה תיאור תפקיד"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >תיאור:</InputAdornment>
            )
          }}
        />
      </div>
    </div>
  );
};
