import React, { useState, useMemo, forwardRef } from "react";
import _ from "lodash";
import { 
  InputBase,
} from "@material-ui/core";
import styles from "./searchBarPerson.styles";
import StyledButton from "../../../components/shared/styleComponent/StyleButton";
import PropTypes from "prop-types";
import usePnValueInput from './usePnValueInput';



const SearchBarPerson = forwardRef(({ onClickSearch, disabled }, ref) => {
  // jss style
  const classes = styles();

  // input value and error
  const { models, operations } = usePnValueInput({search: onClickSearch});

  return (
    <div className={classes.containerSearch}>
      <div className={classes.SearchInput}>
        <InputBase
          inputRef={ref}
          value={models.value}
          onChange={e => operations.onChange(e.target.value)}
          className={classes.root}
          placeholder={"הקלד מספר אישי"}
          onKeyUp={e => operations.handleKeyUp(e.key)}
          disabled={disabled}
        />
        <span className={classes.errorLabel}>{models.errorLabel}</span>
      </div>
      <StyledButton
        onClick={operations.handleSearch}
        disabled={models.disableSearch || disabled}
      >
        חפש
      </StyledButton>
    </div>
  );
})

SearchBarPerson.propTypes = {
  /**
   * Function to search
   */
  onClickSearch: PropTypes.func.isRequired,  
};

export default SearchBarPerson
