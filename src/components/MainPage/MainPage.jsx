import React, { useState, useEffect, useCallback } from 'react';
import GroupList from 'features/groups/groupList';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchByGroupIdIfNeeded } from 'features/persons/personsSlice';
import { selectRootGroupsIds, selectGroupByid } from 'features/groups/groupsSlice';
import Box from '@material-ui/core/Box';
import ScrollFix from 'utils/ScrollFix/ScrollFix';
import PersonDisplay from './PersonDisplay/PersonDisplay';

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#E4EAEA',
    height: 'calc(100vh - 64px)',
    display: 'flex',
  },
  sideBar: {
      // maxHeight: 'calc(100vh - 64px)',
      // maxHeight: 'calc(100% - 3px)',
      // direction: 'rtl',
      // maxHeight: '150px',
      // overflowY: 'auto',
      // maxWidth: '500px',
      // minWidth: '300px',
      width: '20%',
      boxShadow: '0px 0px 5px 0px rgba(125,120,125,0.8)',
      backgroundColor: theme.palette.background.default
      // backgroundColor: '#FAFCFB'
  },
  listContainer: {
    maxHeight: 'calc(100% - 19px)',
  },
  personDisplay: {
    padding: '30px',
    width: '80%',
    // backgroundColor: '#E4EAEA'
  }
}));

const MainPage = props => {
  const classes = styles();
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const dispatch = useDispatch();

  // initially select the first root group
  const rootGroupsIds = useSelector(selectRootGroupsIds);
  useEffect(() => {
    if(rootGroupsIds.length > 0) {
      setSelectedGroupId(rootGroupsIds[0]);
    }
  }, [rootGroupsIds]);

  const handleExpandedChange = (e, nodes) => setExpandedGroups(nodes);
  const handleSelection = (e, groupId, item) => {
    setSelectedGroupId(groupId);
    dispatch(fetchByGroupIdIfNeeded(groupId));
  };

  return selectedGroupId ? (
    <Box className={classes.root}>
      <div className={classes.sideBar}>
          <div>עץ ארגוני</div>
          <ScrollFix className={classes.listContainer}>
            <GroupList 
              selected={selectedGroupId}
              onNodeSelected={handleSelection}
              onNodeToggle={handleExpandedChange}
              expanded={expandedGroups}
            />
          </ScrollFix>
      </div>
      
      <div className={classes.personDisplay}>
        <PersonDisplay groupId={selectedGroupId} />
      </div>
    </Box>
  ): 'loading...';
};

export default MainPage;
