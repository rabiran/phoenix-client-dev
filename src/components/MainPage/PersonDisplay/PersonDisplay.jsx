import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPersonsByGroupId, selectIsLoadingByGroupId, 
  fetchByGroupIdIfNeeded } from 'features/persons/personsSlice';
import PersonGrid from 'features/persons/personGrid';
import PropTypes from 'prop-types';




const PersonDisplay = props => {
  const {
    directGroupId
  } = props;
  const persons = useSelector(state => selectPersonsByGroupId(state, directGroupId)) || [];
  const loading = useSelector(state => selectIsLoadingByGroupId(state, directGroupId));

  return loading ? 'loading...' : (
    <PersonGrid persons={persons} />
  )
};

PersonDisplay.propTypes = {
  directGroupId: PropTypes.string.isRequired,
}

export default PersonDisplay;
