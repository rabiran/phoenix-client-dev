import React, { useState, useEffect, useCallback } from 'react';
import GroupList from 'components/groups/groupTree';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchByGroupIdIfNeeded } from 'features/persons/personsSlice';
import { selectRootGroupsIds } from 'features/groups/groupsSlice';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ScrollFix from 'components/shared/ScrollFix/ScrollFix';
import GroupMembersDisplay from './GroupMembersDisplay';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TreeIcon from 'components/shared/icons/Tree';
import UserInfo from './UserInfo/UserInfo';
import LoadingBar from 'components/shared/Loading/Bar';
import { selectUser } from 'features/auth/authSlice';
import { useMemo } from 'react'; 

const listHeaderHeight = 90;
const userInfoHeight = 200;
const userInfoSmallHeight = 160;

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#E4EAEA',
    height: 'calc(100vh - 64px)',
    overflowY: 'hidden',
  },
  userInfoSection: {
    height: userInfoHeight,
    [theme.breakpoints.down('lg')]: {
      height: userInfoSmallHeight,
    }
  },
  groupsAndMembers: {
    height: `calc(100% - ${userInfoHeight}px)`,
    display: 'flex',
    overflowY: 'hidden',
    [theme.breakpoints.down('lg')]: {
      height: `calc(100% - ${userInfoSmallHeight}px)`,
    },
  },
  sideBar: {
      width: '20%',
      boxShadow: '0px 0px 5px 0px rgba(125,120,125,0.8)',
      backgroundColor: theme.palette.background.default
  },
  listContainer: {
    maxHeight: `calc(100% - ${listHeaderHeight}px)`,
  },
  listHeader: {
    height: listHeaderHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupMembersDisplay: {
    margin: '20px auto',
    width: '60%',
  }
}));

const MainPage = props => {
  const classes = styles();
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const dispatch = useDispatch();

  const rootGroupsIds = useSelector(selectRootGroupsIds);
  const rootGroupLoading = useMemo(() => rootGroupsIds.length === 0, [rootGroupsIds])

  // initially select the first root group
  useEffect(() => {
    if(rootGroupsIds.length > 0) {
      setSelectedGroupId(rootGroupsIds[0]);
    }
  }, [rootGroupsIds, dispatch]);

  // fetch members on selection change
  useEffect(() => {
    if(selectedGroupId) {
      dispatch(fetchByGroupIdIfNeeded(selectedGroupId));
    }
  }, [selectedGroupId, dispatch]);
 
  // select the connected user
  const user = useSelector(selectUser);

  const handleExpandedChange = (e, nodes) => setExpandedGroups(nodes);
  const handleSelection = (e, groupId) => {
    setSelectedGroupId(groupId);
  };

  return ( 
  <Box className={classes.root}>
    <UserInfo 
      user={user}
      classes={{
        root: classes.userInfoSection
      }}
    />
    {rootGroupLoading && <LoadingBar/>}
    <Box className={classes.groupsAndMembers}>
      <div className={classes.sideBar}>
        <ListHeader/>
        <Divider/>
        <ScrollFix className={classes.listContainer}>
        {/* <div className={classes.listContainer}> */}
          <GroupList 
            selected={selectedGroupId}
            onNodeSelected={handleSelection}
            onNodeToggle={handleExpandedChange}
            expanded={expandedGroups}/>
        </ScrollFix>
        {/* </div> */}
      </div>
      
      <div className={classes.groupMembersDisplay}>
        {selectedGroupId && <GroupMembersDisplay groupId={selectedGroupId}/>}
      </div>
    </Box> 
  </Box>)
};

const ListHeader = () => {
  const classes = styles();
  return (
  <Grid 
    container 
    className={classes.listHeader}
    alignContent='center' 
    justify='center' 
    spacing={2}>
    <Grid item>
     <TreeIcon fontSize='large' />
    {/* <img src="sitemap-solid.svg" alt="" width="35px" style={{marginTop: "7px"}}/> */}
      {/* <AccountTreeOutlinedIcon fontSize='large'/> */}
    </Grid>
    <Grid item>
      <Typography variant="h4">עץ אירגוני</Typography>
    </Grid>
  </Grid>);
};

export default MainPage;
