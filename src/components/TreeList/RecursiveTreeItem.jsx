import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';
import {wrap as w} from './wrapper'

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
    // nestedItems,
    classes,
    onSelect,
    // selectedId,
    onClick,
    onKeyDown,
    dense,
    renderDummy,
  } = props;

  const {
    isSelected,
    setFocused,
  } = useContext(TreeListContext);
  const nestedItems = item.children ? item.children : [];
  const children = renderDummy ? <span>loading...</span> : 
  nestedItems.map(i => 
    w(false)({
      classes,
      onSelect,
      item: i,
    }, RecursiveTreeItem)
  );

  const handleClick = (e) => {
    onSelect(e, item.id);
    if(onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
        onSelect(event, item.id);
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
      nodeId={item.id}
      classes= {{
        root: classes.itemRoot,
        content: clsx(classes.itemContent, {[classes.selected]: isSelected(item.id)}),
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

// RecursiveTreeItem.muiName = TreeItem.muiName;
export default RecursiveTreeItem;
