import React, {useState} from 'react';
import GroupTree from '../../components/groups/groupTree';

export default function TreeDemo() {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleExpandedChange = (e, nodes) => setExpanded(nodes);
  const handleSelection = (e, node) => {
    console.log('selected id: ', node);
    setSelected(node);
  }

  return (
    <div style={{maxHeight: 'calc(100vh - 64px)', overflowY: 'scroll', maxWidth:'500px'}}>
      <GroupTree 
        selected={selected}
        onNodeSelected={handleSelection}
        expanded={expanded}
        onNodeToggle={handleExpandedChange}/>
    </div>
  );
}
