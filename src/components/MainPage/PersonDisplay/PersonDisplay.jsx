import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
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


const PersonDisplay = props => {
  const {
    groupId,
  } = props;
  const classes = styles();
  const persons = useSelector(state => selectPersonsByGroupId(state, groupId)) || [];
  const loading = useSelector(state => selectIsLoadingByGroupId(state, groupId));
  const group = useSelector(state => selectGroupByid(state, groupId));
  const groupName = group ? group.name : '...';

  return (
    <div className={classes.root}>
      <Typography variant="h6">{groupName}</Typography>
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
