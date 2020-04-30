import React, { useState } from 'react';
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
import PersonGrid from 'features/persons/personGrid';
import PropTypes from 'prop-types';

const styles = makeStyles({
  root: {
    overflowX: 'hidden',
    minHeight: '500px',
    // padding: '15px'
  },
  content: {
    paddingTop: '15px',
  },
});

const inputStyles= makeStyles(theme => ({
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
    width: '13%', 
    minWidth: '130px'
  },
  memberCount: {
    marginLeft: '7px'
  }
});

const onlyLetters = new RegExp(/^[a-z\u0590-\u05fe]*$/i);

const PersonDisplay = props => {
  const {
    groupId,
  } = props;
  
  // styles
  const classes = styles();
  const inputClasses = inputStyles();
  const headerClasses = headerStyles();
  
  // 
  const [filterTerm, setFilter] = useState('');
  const persons = (useSelector(state => selectPersonsByGroupId(state, groupId)) || [])
    .filter(p => p.fullName.startsWith(filterTerm));
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));
  const groupName = group ? group.name : '...';

  const filterInputChange = e => {
    const val = e.target.value;
    if (onlyLetters.test(val)) {
      setFilter(val);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-end" className={headerClasses.root}> 
        <Grid item className={headerClasses.groupName}>
          <Typography display="inline" variant="h4">{groupName}</Typography>
          <Typography className={headerClasses.memberCount} display="inline" variant="body1">({persons.length})</Typography>
        </Grid>
        <Grid item>
          <OutlinedInput
            fullWidth
            onChange={filterInputChange}
            value={filterTerm}
            placeholder='חפש אנשים בקבוצה'
            endAdornment={
              <InputAdornment>
                <SearchIcon/>
              </InputAdornment>
            }
            classes={{...inputClasses}}
          />
        </Grid>
      </Grid>
      <Divider/>
      <div className={classes.content}>
        { loading ? <Spinner/> : <PersonGrid persons={persons}/>}
      </div>
    </div>
  );
};

PersonDisplay.propTypes = {
  groupId: PropTypes.string.isRequired,
}

export default PersonDisplay;
