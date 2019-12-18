import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/grey';

const useStyles = makeStyles({
  listItem: {
    height: 216,
    flexGrow: 1,
    maxWidth: 500,
  },
});

const StyledListItem = withStyles({
  root: {
    '&:hover, &:focus, &$selected, &$selected:hover': {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  },
  button: {
    '&:hover, &:focus': {
      backgroundColor: 'rgba(0,0,0,0)',
    }
  },
  selected: {}
})(ListItem);
StyledListItem.muiName = ListItem.muiName;

const StyledTreeItem = withStyles({
  content: {
    backgroundColor: props => props.selected ? 'green' : 'white',
  }
})(TreeItem);
StyledTreeItem.muiName = TreeItem.muiName;


export const styles = theme => ({
  itemRoot: {
    '&:focus > $itemContent$selected': {
      backgroundColor: green[400],
    }
  },
  itemContent: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,}),
    '&:hover': {
      backgroundColor: red[100]
    },
    '&$selected, &$selected:hover': {
      backgroundColor: green[400]
    }
  },
  /* pseudo class applied to the itemContent when selected */
  selected: {},
});

const TreeList = (props) => {
  const { 
    data,
    selected,
    onNodeSelected,
    expanded,
    onNodeToggle,
    onKeyDown,
    onClick,
    dummyChildrenComponent,
    classes,
    ...other
  } = props;

  const [focused, setFocused] = useState(null);
  const dummyChildren = dummyChildrenComponent ? dummyChildrenComponent : <span>Loading ...</span>; 

  const listItemClasses = {
    button: classes.item,
    selected: classes.selected,
  };
  // const classes = useStyles();

  // recursive function to rendrer data
  const listJsx = (data, d = 0) => {
    return data.map(item => {
      const id = item.id;
      const children = item.children ? item.children : [];
      const renderDummyChildren = children.length > 0 && !children[0].id;
      const isSelected = selected === id;
      return (
        <TreeItem
          // className={clsx({[classes.nodeSelected]: isSelected})}
          classes= {{
            root: classes.itemRoot,
            content: clsx(classes.itemContent, {[classes.selected]: isSelected}),
          }}
          onFocus={e => {
            e.stopPropagation();
            setFocused(id);
          }}
          onClick ={e => handleNodeClick(e, id)}
          key={id} 
          nodeId={id}
          onKeyDown={handleKeyDown}
          selected={isSelected}
          label={
          // <List 
             
          //   disablePadding
          // >
          //   <StyledListItem 
          //     button 
          //     key={id} 
          //     selected={isSelected}
          //     classes= {listItemClasses}
          //   >
          //   <ListItemText>{item.value}</ListItemText>
          //   </StyledListItem>
          // </List>
          item.value
          }
        >
          { renderDummyChildren ? dummyChildren : listJsx(children, d + 1) }
        </TreeItem>
      )
    })
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    let flag =false;
    // if (event.altKey || event.ctrlKey || event.metaKey) {
    //   return;
    // }
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
    if (onKeyDown) {
      onKeyDown(event);
    }
    // if(flag) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }   
  };

  const handleNodeClick = (event, id) => {
    onNodeSelected(event, id);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <TreeView
      className={classes.root}
      expanded={expanded}
      onNodeToggle={onNodeToggle}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronLeftIcon />}
    >
      { listJsx(data) }
    </TreeView>
  );
}

export default withStyles(styles)(TreeList);