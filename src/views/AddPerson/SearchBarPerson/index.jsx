import React from "react";
import _ from 'lodash';
import { Link, InputLabel, InputBase } from "@material-ui/core";
import styles from "./searchBarPerson.styles";
import StyledButton from '../../../components/shared/styleComponent/StyleButton';

export default ({onClickSearch, person}) => {
  const [personalNumber, setPersonalNumber] = React.useState(() => (!_.isEmpty(person) ? person.personalNumber : ""));
  const [errorLabel, setErrorLabel] = React.useState("");
  const classes = styles();
  const handleSearch = (prsnlNmbr) => {
    onClickSearch(prsnlNmbr);
  };
  
  const handleChangeInput = (event)=> {
    if(/^\d{0,9}$/.test(event.target.value)){
      setPersonalNumber(event.target.value);
      setErrorLabel("")
    }
    if (!/^\d{5,9}$/.test(event.target.value)) {
      setErrorLabel("יש להכניס 6-9 ספרות בלבד!");
    }
  };

  const handleKeyUp = (event) => {
    if(event.key === 'Enter'){  
      handleSearch(personalNumber)
    }
  }

  let display;

  if (Object.keys(person).length === 0) {
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
        <StyledButton onClick={() => handleSearch(personalNumber)}>
          חפש
        </StyledButton>
      </div>
    );
  } else {
    display = (
      <div className={classes.personalNumberDetails}>
        <InputLabel className={classes.inputLabel} disabled={true}>
          מספר אישי:
        </InputLabel>
        <InputLabel className={classes.inputLabel}>{personalNumber}</InputLabel>
        <Link underline="always" className={classes.updateLink} onClick={() => handleSearch('')}>עדכן</Link>
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
