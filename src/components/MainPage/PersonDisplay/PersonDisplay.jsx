import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
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
  }
});


const PersonDisplay = props => {
  const {
    groupId,
  } = props;
  const classes = styles();
  const persons = useSelector(state => selectPersonsByGroupId(state, groupId)) || [];
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));

  return (
    <div className={classes.root}>
      <div>{group.name}</div>
      <Divider/>
      <div className={classes.content}>
        { loading ? 'טוען...': <PersonGrid persons={persons}/>}
      </div>
    </div>
  );
};

PersonDisplay.propTypes = {
  groupId: PropTypes.string.isRequired,
}

export default PersonDisplay;
