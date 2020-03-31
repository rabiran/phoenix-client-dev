import React, { useState } from 'react';
import GroupList from 'features/groups/groupList';
import { makeStyles } from '@material-ui/styles';
import PersonGrid from 'features/persons/personGrid';
import { useSelector } from 'react-redux';
import { selectIdsByGroupId } from 'features/persons/personsSlice';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const scrollFixStyles = makeStyles({
  scrollContainer: {
    direction: 'rtl',
    overflowY: 'auto',
    maxHeight: 'inherit'
  },
  childrenContainer: {
    direction: 'ltr',
  }
})
const ScrollFix = ({ children, className }) => {
  const { scrollContainer, childrenContainer } = scrollFixStyles();
  return (
    <div className={clsx(className, scrollContainer)}>
      <div className={childrenContainer}>{children}</div>

    </div>
  );
};

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#E4EAEA'
  },
  sideBar: {
      maxHeight: 'calc(100vh - 64px)',
      // direction: 'rtl',
      // maxHeight: '150px',
      // overflowY: 'auto',
      maxWidth: '500px',
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
    margin: '20px',
    // backgroundColor: '#E4EAEA'
  }
}));

const MainPage = props => {

  const [expandedGroups, setExpandedGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const classes = styles();

  const handleExpandedChange = (e, nodes) => setExpandedGroups(nodes);
  const handleSelection = (e, groupId, item) => {
    setSelectedGroupId(groupId);
  };

  const selectedPersonIds = useSelector(state => selectIdsByGroupId(state, selectedGroupId)) || [];

  return (
    <Box display='flex' style={{backgroundColor: '#E4EAEA'}}>
      {/* <div style={{overflowY: 'auto'}}> */}
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
      {/* </div> */}
      
      <div className={classes.personDisplay}>
        <PersonGrid personIds={selectedPersonIds}/>
      </div>
    </Box>
  )
}


export default MainPage;
