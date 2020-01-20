import React from "react";
import { Link, InputLabel, InputBase, ButtonBase } from "@material-ui/core";
import styles from "./SearchBarPerson.styles";
//import Button from "@material-ui/core/ButtonBase";

export default props => {
  // person={props.person}
  // onClickSearch={props.onClickSearch}
  const [personalNumber, setPersonalNumber] = React.useState("");
  const [errorLabel, setErrorLabel] = React.useState("");
  const classes = styles();
  const handleSearch = () => {
    props.onClickSearch(personalNumber);
  };
  
  const handleChangeInput = (event)=> {
    if(/^\d{0,9}$/.test(event.target.value)){
      setPersonalNumber(event.target.value);
      setErrorLabel("")
    } else {
      setErrorLabel("יש להכניס 6-9 ספרות בלבד!");
    }
  };

  const handleKeyUp = (event) => {
    if(event.key === 'Enter'){  
      handleSearch()
    }
  }

  let display;

  if (Object.keys(props.person).length === 0) {
    display = (
      <div className={classes.containerSearch}>
        <div className={classes.SearchInput}>
          <InputBase            
            value={personalNumber}
            onChange={handleChangeInput}
            className={classes.root}
            placeholder={"הקלד מספר אישי"}   
            inputProps={{maxLength:"9"}}
            onKeyUp={handleKeyUp}                        
          />
          <span className={classes.errorLabel}>{errorLabel}</span>
        </div>
        <ButtonBase className={classes.button} onClick={handleSearch}>
          חפש
        </ButtonBase>
      </div>
    );
  } else {
    display = (
      <div className={classes.personalNumberDetails}>
        <InputLabel className={classes.inputLabel} disabled={true}>
          מספר אישי:
        </InputLabel>
        <InputLabel className={classes.inputLabel}>{personalNumber}</InputLabel>
        <Link underline="always">עדכן</Link>
      </div>
    );
  }
  return (
    <>
      <div className={classes.titleLabel}>
        <label>הקלד מספר אישי להשלמת פרטי החייל:</label>
      </div>
      {display}
    </>
  );
};
