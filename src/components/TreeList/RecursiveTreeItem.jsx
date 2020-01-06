import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';
import {wrap as w} from './wrapper'

const NOT_TABABLE = -1;

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
    // nodeId,
    item, //supplied via Redux connect()
    classes,
    // onSelect,
    // onClick,
    // onKeyDown,
    isAleaf,
  } = props;


  const {
    isSelected,
    handleNodeClick,
    handleKeyDown,
    dense
  } = useContext(TreeListContext);

  const nestedItems = item.children ? item.children : [];
  const renderDummy = nestedItems.length === 0 && !isAleaf;

  const children = renderDummy ? <span>loading...</span> : 
  nestedItems.map(i => 
    <RecursiveTreeItem
      key={i}
      nodeId={i}
    />
  );

  return ( 
    <TreeItem
      nodeId={item.id}
      classes= {{
        root: classes.itemRoot,
        content: clsx(classes.itemContent, {[classes.selected]: isSelected(item.id)}),
        expanded: classes.expanded,
      }}
      onClick={e=> handleNodeClick(e, item.id)}
      onKeyDown={e=> handleKeyDown(e, item.id)}
      label={
      <CleanButton
        tabIndex={NOT_TABABLE}
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
