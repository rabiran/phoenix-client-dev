import React, { useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Spinner from 'components/common/Loading/Spinner'
import { selectPersonsByGroupId, selectIsLoadingByGroupId } from 'features/persons/personsSlice';
import { selectGroupByid } from 'features/groups/groupsSlice';
import PersonGrid from 'components/persons/personGrid';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SearchInput from './SearchInput';

import faker from 'faker/locale/en';
const fakePersons =  [...Array(1000).keys()].map(i => ({id: i, fullName: `${faker.name.findName().toLowerCase()}`}));
const fakePersons2 =  [...Array(99).keys()].map(i => ({id: i, fullName: `elad${i}`}));

const styles = makeStyles({
  root: {
    overflow: 'hidden',
    // width: '80%'
  },
  content: {
    height:'75%',
  },
});

const headerStyles = makeStyles({
  root: {
    marginBottom: '3px',
  },
  groupTitle: {
    display: 'flex',
    alignItems: 'baseline',
    minWidth: '130px',
  },
  memberCount: {
    marginLeft: '7px',
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
  // debounce the filterTerm update
  const [filterTerm, setFilter] = useState('');
  const setFilterDebounced = useRef(_.debounce(setFilter));
  const filterInputChange = useCallback(value => {
    setFilterDebounced.current(value);
  }, [setFilterDebounced]) 
  // const persons = (useSelector(state => selectPersonsByGroupId(state, groupId)) || [])
  const persons = fakePersons
    .filter(p => p.fullName.startsWith(filterTerm));
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));
  const groupName = group ? group.name : '...';
  const hierarchy = group ? group.hierarchy : [];

  return (<>
    <Grid container spacing={2} alignItems='flex-end' justify='space-between' className={headerClasses.root}> 
      <Grid item className={headerClasses.groupTitle}>
        <Typography 
          color='textSecondary' 
          variant='h6' 
          component='p'>
          {`${hierarchy.join(' / ')}${hierarchy.length !== 0 ?  ' / ' : ''}` }
        </Typography>
        <Typography variant='h6' component='p'>{groupName}</Typography>
        <Typography className={headerClasses.memberCount} variant="body2">({persons.length})</Typography>
      </Grid>
      <Grid item>
        <SearchInput
          onValueChange={filterInputChange}
          resetOn={groupId}
          validator={inputValidate}
          placeholder='חפש אנשים בקבוצה'
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

export default PersonDisplay;
