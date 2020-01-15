import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';

const NOT_TABABLE = -1;

const CleanButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
}, { name: 'CleanButton' })(Button);
CleanButton.muiName = Button.muiName;

export const RecursiveTreeItem = (props) => {
  const {
    item, 
    childItems,
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

  // first priority- the supplied prop
  const nestedItems = childItems ? childItems : 
  /* second priority- item.children 
  only if exists and contains at least one object with id property
  */
  item.children && item.children.length > 0 && item.children[0].id ? item.children 
  : [];
  const renderDummy = nestedItems.length === 0 && !item.isAleaf;

  const children = renderDummy ? 
  <></>:
  nestedItems.map(child => 
    <ConnectedTreeItem
      key={child.id}
      nodeId={child.id}
      item={child}
      classes={classes}
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
        { item.name }
      </CleanButton>
     }
    >
      { children }
    </TreeItem>   
 );
}

RecursiveTreeItem.muiName = TreeItem.muiName;

RecursiveTreeItem.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The id of the data item (required)
   */
  nodeId: PropTypes.string.isRequired,
  /**
   * the data item of this tree node
   */
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
  }).isRequired,
  /**
   * Array of child items 
   */
  childItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
  })),
  /**
   * Whether the node is a leaf (have no child nodes). 
   * if false and also this node was not given children: 
   * a dummy child and expander icon will be rendered
   */
  isAleaf: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => ({
  childItems: ownProps.item.children ?
    ownProps.item.children.map(id => state.groups.byId[id]).filter(group => group): [],
});

const ConnectedTreeItem = connect(
  mapStateToProps,
)(RecursiveTreeItem);

export default ConnectedTreeItem;
