import React, { useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Spinner from 'components/shared/Loading/Spinner'
import { selectPersonsByGroupId, selectIsLoadingByGroupId } from 'features/persons/personsSlice';
import { selectGroupByid } from 'features/groups/groupsSlice';
import PersonGrid from './PersonGrid';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SearchInput from './SearchInput';

import faker from 'faker/locale/en';
const fakePersons =  [...Array(1000).keys()].map(i => ({id: i, fullName: `${faker.name.findName().toLowerCase()}`}));
const fakePersons2 =  [...Array(99).keys()].map(i => ({id: i, fullName: `elad${i}`}));

const ITEM_HEIGHT = 130;
const ITEM_WIDTH = 100;
const ITEM_SPACING = 3;

const styles = makeStyles(theme => ({
  root: {
    flexWrap: 'nowrap',
    height: '100%',
  },
  content: {
    minHeight: ITEM_HEIGHT,
    flexGrow: 1,
    flexShrink: 1,
  },
}));

const headerStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  groupTitle: {
    display: 'flex',
    alignItems: 'baseline',
    minWidth: '130px',
  },
  memberCount: {
    marginLeft: '7px',
  }
}));

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
  const setFilterDebounced = useCallback(_.debounce(setFilter), []);
  const filterInputChange = useCallback(value => {
    setFilterDebounced(value);
  }, [setFilterDebounced]);
  const persons = useSelector(state => selectPersonsByGroupId(state, groupId)) || [];
  // const persons = fakePersons;
  const filteredPersons = useMemo(() => persons.filter(p => p.fullName.startsWith(filterTerm)), [filterTerm, persons]) ;
  const group = useSelector(state => selectGroupByid(state, groupId)) || {};
  // group name and hierarchy
  const {
    name: groupName = '...',
    hierarchy = []
  } = group;
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));

  return (
  <Grid 
    className={classes.root} 
    container 
    direction="column">
    <Grid
      item
      container
      alignItems='flex-end'
      justify='space-between'
      className={headerClasses.root}> 
      <Grid item className={headerClasses.groupTitle}>
        <Typography
          color='textSecondary'
          variant='h6'
          component='p'>
          {`${hierarchy.join(' / ')}${hierarchy.length !== 0 ?  ' / ' : ''}` }
        </Typography>
        <Typography variant='h6' component='p'>{groupName}</Typography>
        <Typography className={headerClasses.memberCount} variant="body2">({filteredPersons.length})</Typography>
      </Grid>
      <Grid item>
        <SearchInput
          onValueChange={filterInputChange}
          resetOn={groupId}
          validator={inputValidate}
          placeholder='חפש אנשים בקבוצה' />
      </Grid>
    </Grid>
    <Divider/>
    <Grid 
      container
      justify='center'
      alignItems='center'
      className={classes.content}>
      {
        loading ? <Spinner size={80}/> :
        <PersonGrid 
          persons={filteredPersons}
          itemWidth={ITEM_WIDTH}
          itemHeight={ITEM_HEIGHT}
          spacing={ITEM_SPACING}
        />
      }
    </Grid>
  </Grid>);
};

PersonDisplay.propTypes = {
  groupId: PropTypes.string.isRequired,
}

export default PersonDisplay;
