import React, { useState, useCallback } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 500,
  },
});


function listJsx({data, selected, onNodeSelected, focused, setFocused, isExpanded}) {
  
  return data.map(item => {
    const id = item.id;
    const expanded = isExpanded(id);
    const children = item.children ? item.children : [];
    const renderChildren = children.length > 0;
    return (
      <TreeItem 
        onFocus={e => {
          e.stopPropagation();
          setFocused(id);
        }}
        onClick ={e => onNodeSelected(e, id)}
        key={id} 
        nodeId={id}
        label={
        <ListItem>
          <ListItemText>{item.value}</ListItemText>
        </ListItem>}
      >
        

      </TreeItem>
    )
  })
}

const TreeList = (props) => {
  const { data, selected, onNodeSelected, expanded, onNodeToggle } = props;
  const [focused, setFocused] = useState(null);
  // const isExpanded = useCallback(id => expanded.indexOf(id) !== -1, [expanded]);

  const classes = useStyles();
  // recursive function to rendrer data
  const listJsx = (data, d = 0) => {
    return data.map(item => {
      const id = item.id;
      const children = item.children ? item.children : [];
      return (
        <TreeItem 
          onFocus={e => {
            e.stopPropagation();
            setFocused(id);
          }}
          onClick ={e => onNodeSelected(e, id)}
          key={id} 
          nodeId={id}
          onKeyDown={handleKeyDown}
          label={
          <List dense disablePadding>
            <ListItem key={id} selected={selected === id}>
            <ListItemText>{item.value}</ListItemText>
            </ListItem>
          </List>
          // item.value
          }
        >
          { listJsx(children, d + 1) }
        </TreeItem>
      )
    })
  }

  const handleKeyDown = (event) => {
    const key = event.key;
    console.log('key', key);
    let flag =false;
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return;
    }
    switch (key) {
      case 'Enter':
      case ' ':
        onNodeSelected(event, focused);
        flag = true;
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        flag = true
        break;
      default:
        break;
    }
    if(flag) {
      event.preventDefault();
      event.stopPropagation();
    }   
  }

  return (
    // <List>
      <TreeView
        className={classes.root}
        expanded={expanded}
        onNodeToggle={onNodeToggle}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronLeftIcon />}
      >
        { listJsx(data) }
      </TreeView>
    // </List>
  )

}

export default TreeList;