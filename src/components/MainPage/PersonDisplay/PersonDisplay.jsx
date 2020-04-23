import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonsByGroupId, selectIsLoadingByGroupId, 
  fetchByGroupIdIfNeeded } from 'features/persons/personsSlice';
import PersonGrid from 'features/persons/personGrid';
import PropTypes from 'prop-types';

const styles = makeStyles({
  root: {
    overflowX: 'hidden',
    minHeight: '500px',
    padding: '15px'
  },
});


const PersonDisplay = props => {
  const {
    directGroupId,
  } = props;
  const classes = styles();
  const persons = useSelector(state => selectPersonsByGroupId(state, directGroupId)) || [];
  const loading = useSelector(state => selectIsLoadingByGroupId(state, directGroupId));

  return (
    <div className={classes.root}>
      { loading ? 'loading...' : <PersonGrid persons={persons}/>}
    </div>
  );
};

PersonDisplay.propTypes = {
  directGroupId: PropTypes.string.isRequired,
}

export default PersonDisplay;
