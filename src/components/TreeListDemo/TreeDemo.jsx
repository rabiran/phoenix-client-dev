import React, {useState} from 'react';
import TreeList from '../../features/groups/groupList/TreeList';
import { makeStyles } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal';


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  itemRoot: {
    // '&$expanded': {
    //   backgroundColor: green[100],
    // },
    '&:focus > $itemContent$selected': {
      backgroundColor: teal,
    }
  },
  itemContent: {
    '&$selected, &$selected:hover': {
      backgroundColor: teal
    },
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
    <TreeList 
      classes={classes}
      selected={selected}
      onNodeSelected={handleSelection}
      expanded={expanded}
      onNodeToggle={handleExpandedChange}
    >
    </TreeList>
  )
}