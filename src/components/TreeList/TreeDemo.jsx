import React, {useState} from 'react';
import TreeList from './TreeList';


export default function TreeDemo() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleExpandedChange = (e, nodes) => setExpanded(nodes);
  const handleSelection = (e, node) => setSelected(node);
  const data = [
    {
      id: '1',
      value: 'מקרעקר',
      children: [
        {
          id: '4',
          value: 'נייטרווווו',
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
      data={data}
      selected={selected}
      onNodeSelected={handleSelection}
      expanded={expanded}
      onNodeToggle={handleExpandedChange}
    >
    </TreeList>
  )
}