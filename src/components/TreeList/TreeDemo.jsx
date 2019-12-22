import React, {useState} from 'react';
import TreeList from './TreeList';
import { withStyles, makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  }
}); 

export default function TreeDemo() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleExpandedChange = (e, nodes) => setExpanded(nodes);
  const handleSelection = (e, node) => setSelected(node);

  const classes = useStyles();
  const data = [
    {
      id: '1',
      value: 'מקרעקר',
      children: [
        {
          id: '4',
          value: 'נייטרווווו',
          children: [
            {
              id: '8',
              value: 'אני בפנים'
            }
          ]
        },
        {
          id: '5',
          value: 'נייטרווווו',
        }
      ]
    },
    {
      id: '2',
      value: 'מקרעקר',
    },
    {
      id: '3',
      value: 'מקרעקר',
      children: [
        {
          id: '6',
          value: 'נייטרווווו',
          children: ['234','56t']
        },
        {
          id: '7',
          value: 'נייטרווווו',
        },
      ]
    }
  ];

  return (
    <TreeList 
      classes={{
        root: classes.root,
      }}
      data={data}
      selected={selected}
      onNodeSelected={handleSelection}
      expanded={expanded}
      onNodeToggle={handleExpandedChange}
    >
    </TreeList>
  )
}