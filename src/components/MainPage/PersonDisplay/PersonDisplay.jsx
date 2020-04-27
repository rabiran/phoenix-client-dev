import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'components/common/Loading/Spinner'
import { selectPersonsByGroupId, selectIsLoadingByGroupId,
  fetchByGroupIdIfNeeded } from 'features/persons/personsSlice';
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

const labelContainerStyles = makeStyles({
  root: {
    width: '13%', 
    minWidth: '130px'
  }
});

const PersonDisplay = props => {
  const {
    groupId,
  } = props;

  
  // styles
  const classes = styles();
  const inputClasses = inputStyles();
  const labelContainerClasses = labelContainerStyles();
  
  // 
  const [filterTerm, setFilter] = useState('a');
  useEffect(()=> {
    console.log('efectttttttttt');
    console.log('filter:', filterTerm);
  });
  const persons = useSelector(state => selectPersonsByGroupId(state, groupId)) || [];

  
  const ff = persons.filter(p => p.fullName.startsWith(filterTerm));
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));
  const groupName = group ? group.name : '...';



  

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="flex-end" style={{marginBottom:'3px'}}> 
        <Grid item className={labelContainerClasses.root}><Typography display="inline" variant="h4">{groupName}</Typography></Grid>
        <Grid item>
          <OutlinedInput
            onChange={e => setFilter(e.target.value)}
            value={filterTerm}
            // classes={{
            //   input: inputClasses.input,
            //   root: inputClasses.root,
            //   notchedOutline: inputClasses.notchedOutline,
            //   focused: inputClasses.focused
            // }}
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
