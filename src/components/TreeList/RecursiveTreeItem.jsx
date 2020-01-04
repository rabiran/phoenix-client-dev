import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';

const CleanButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
}, { name: 'CleanButton' })(Button);
CleanButton.muiName = Button.muiName;

const RecursiveTreeItem = (props) => {
  const {
    item,
    classes,
    onSelect,
    // selectedId,
    onClick,
    onKeyDown,
    dense,
    notLoaded,
  } = props;

  const {
    isSelected,
    setFocused,
  } = useContext(TreeListContext);

  // the treeItem's data has not been loaded yet
  if(notLoaded || !(item.id)) return (<span>loading...</span>)

  const nodeId = item.id;
  const nestedItems = item.children ? item.children : [];
  //
  const children = nestedItems.map(i => 
    <RecursiveTreeItem
      nodeId={i.id ? i.id : i} // because of MUI treeView implementation
      key={i.id ? i.id : i}
      item={i}
      classes={classes}
      onSelect={onSelect}
    />
  );

  const handleClick = (e) => {
    onSelect(e, nodeId);
    if(onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
        onSelect(event, nodeId);
        break;
      default:
        break;
    }
    if (onKeyDown) {
      onKeyDown(event);
    } 
  };
  
  return ( 
    <TreeItem
      nodeId={nodeId}
      classes= {{
        root: classes.itemRoot,
        content: clsx(classes.itemContent, {[classes.selected]: isSelected(nodeId)}),
        expanded: classes.expanded,
     }}
     onClick={handleClick}
     onKeyDown={handleKeyDown}
     label={
      <CleanButton
        tabIndex={-1}
        classes={{
          root: clsx(
            classes.button, 
            { [classes.dense]: dense }
          )
        }}
      >
        { item.value }
      </CleanButton>
     }
    >
      { children }
    </TreeItem>   
 );
}

RecursiveTreeItem.muiName = TreeItem.muiName;
export default RecursiveTreeItem;
