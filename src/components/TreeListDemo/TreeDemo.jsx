import React, {useState} from 'react';
import TreeList from '../../features/groups/groupList/TreeList';
import { makeStyles } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal';


const useStyles = makeStyles({
  itemRow: {
    // borderRadius: '35px',
    // '&:hover': {
    //   borderRadius: '35px',
    // },
    // '&$selected, &$selected:hover': {
    //   borderRadius: '35px',
    // }
  },
  itemContent: {
    // borderRadius: '35px',
    // : '35px',
    // borderTopRightRadius: '35px',
    // borderBottomRightRadius: '35px',
  },
  selected: {}
}); 

export default function TreeDemo() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleExpandedChange = (e, nodes) => setExpanded(nodes);
  const handleSelection = (e, node, item) => {
    console.log('group: ', item);
    setSelected(node);
  }

  const classes = useStyles();

  return (
    <div style={{maxHeight: 'calc(100vh - 64px)', overflowY: 'scroll', maxWidth:'500px'}}>
      <TreeList 
      classes={classes}
      selected={selected}
      onNodeSelected={handleSelection}
      expanded={expanded}
      onNodeToggle={handleExpandedChange}
    >
    </TreeList>
    </div>
    
  )
}