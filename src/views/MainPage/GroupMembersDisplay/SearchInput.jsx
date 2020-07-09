import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';

const inputStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'white',
    borderRadius: '15px',
    '&$focused $notchedOutline, &:hover$focused $notchedOutline': {
      borderWidth: '1px',
      borderColor: theme.palette.primary.main,
    },
    '&:hover $notchedOutline': {
      borderColor: '#e0e0e0',
    }
  },
  input: {
    padding: '9px',
  },
  notchedOutline: {
    borderColor: '#e0e0e0',
  },
  focused: {}
}));

const SearchInput = ({ 
  onValueChange, 
  resetOn, 
  validator = () => true, 
  placeholder 
}) => {
  const [value, setValue] = useState('');
  const onChange = e => {
    const val = e.target.value;
    if (validator(val)){
      setValue(val);
      onValueChange(val);
    }
  };
  useEffect(() => {
    setValue('');
    onValueChange('')
  }, [resetOn, onValueChange]);
  
  const classes = inputStyles();

  return (
    <OutlinedInput
      fullWidth
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      endAdornment={
        <InputAdornment>
          <SearchIcon/>
        </InputAdornment>
      }
      classes={{...classes}}/>
  );
}

SearchInput.propTypes = {
  /**
   * callback function called when the input value changes.
   * signature: `(value: string) => void`
   */
  onValueChange: PropTypes.func,
  /**
   * clears the input value when this prop changes
   */
  resetOn: PropTypes.any,
  /**
   * validator function that gets the input next value and returns
   * whether its valid: if false - the input won't update its value.
   * signature: `(value: string) => bool`
   */
  validator: PropTypes.func,
}

export default SearchInput;
