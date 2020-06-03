import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Spinner from 'components/common/Loading/Spinner'
import { selectPersonsByGroupId, selectIsLoadingByGroupId } from 'features/persons/personsSlice';
import { selectGroupByid } from 'features/groups/groupsSlice';
import PersonGrid from 'components/persons/personGrid';
import PropTypes from 'prop-types';
import _ from 'lodash';

import faker from 'faker/locale/en';
const fakePersons =  [...Array(1000).keys()].map(i => ({id: i, fullName: `${faker.name.findName().toLowerCase()}`}));
const fakePersons2 =  [...Array(10000).keys()].map(i => ({id: i, fullName: `elad${i}`}));

const styles = makeStyles({
  root: {
    overflow: 'hidden',
    // minHeight: '500px',
    // padding: '15px'
    width: '80%'
  },
  content: {
    height:'75%',
    // overflowY: 'auto',
    // overflowX: 'hidden',
    // width: '80%'
  },
});

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
    // borderColor: 'red',
  },
  focused: {}
}));

const headerStyles = makeStyles({
  root: {
    marginBottom: '3px',
  },
  groupName: {
    display: 'flex',
    alignItems: 'baseline',
    // width: '13%', 
    minWidth: '130px'
  },
  memberCount: {
    marginLeft: '7px'
  }
});

const onlyLetters = new RegExp(/^[a-z\u0590-\u05fe\s`']*$/i);

const inputValidate = val => {
  return onlyLetters.test(val) 
    && !/^[\s'`]+$/.test(val) 
    && !/[\s'`]{2,}/.test(val);
}

const PersonDisplay = ({ groupId }) => {
  // styles
  const classes = styles();
  const headerClasses = headerStyles();  
  // 
  const [filterTerm, setFilter] = useState('');
  const setFilterDebounced = useRef(_.debounce(setFilter));
  // const persons = (useSelector(state => selectPersonsByGroupId(state, groupId)) || [])
  const persons = fakePersons2
    .filter(p => p.fullName.startsWith(filterTerm));
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));
  const groupName = group ? group.name : '...';

  const filterInputChange = useCallback(value => {
    setFilterDebounced.current(value);
  }, [setFilterDebounced]) 

  return (<>
    <Grid container spacing={2} alignItems="flex-end" justify='space-between' className={headerClasses.root}> 
      <Grid item className={headerClasses.groupName}>
        <Typography display="inline" variant="h4">{groupName}</Typography>
        <Typography className={headerClasses.memberCount} display="inline" variant="body1">({persons.length})</Typography>
      </Grid>
      <Grid item>
        <SearchInput
          onValueChange={filterInputChange}
          resetOn={groupId}
        />
      </Grid>
    </Grid>
    <Divider/>
    <div className={classes.content}>{
      loading ? 
      <Spinner/> : 
      <PersonGrid persons={persons} itemWidth={120}/>
    }</div>
    </>);
};

PersonDisplay.propTypes = {
  groupId: PropTypes.string.isRequired,
}

const SearchInput = ({ onValueChange, resetOn }) => {
  const [value, setValue] = useState('');
  const onChange = e => {
    const val = e.target.value;
    if (inputValidate(val)){
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
      placeholder='חפש אנשים בקבוצה'
      endAdornment={
        <InputAdornment>
          <SearchIcon/>
        </InputAdornment>
      }
      classes={{...classes}}/>
  );
}

export default PersonDisplay;
