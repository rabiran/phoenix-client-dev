import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles, useTheme } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';
import { selectGroupByid } from '../groupsSlice';
import wrapFetch from './wrapFetch';
import VisibilityOptimizer from 'utils/visibilityObserver/VisibilityOptimizer';
import { DEFAULT_VISIBILITY_CHILDREN_THRESHOLD } from './TreeList'

const LEFT_ARROW_KEY = 'ArrowLeft', RIGHT_ARROW_KEY = 'ArrowRight';

export const RecursiveTreeItem = (props) => {
  const {
    group,
    onClick,
    onKeyDown,
    children,
    visible
  } = props;

  const {
    isSelected,
    handleNodeClick,
    handleNodeKeyDown,
    dense,
    classes,
  } = useContext(TreeListContext);

  const theme = useTheme();
  const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;
  const nestedItems = group.children ? group.children : [];

  const defaultVisibility = nestedItems.length < DEFAULT_VISIBILITY_CHILDREN_THRESHOLD;

  // if children given - render them
  const renderChildren = children ? children :
  nestedItems.map(childId => 
    <VisibilityOptimizer
      key={childId}
      nodeId={childId}
      component={ConnectedTreeItem}
      defaultVisibility={defaultVisibility}
    />
  );
  

  const handleKeyDown = event => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
      case nextArrowKey:
        handleNodeKeyDown(event, group.id, group)
        break;
      default:
        break;
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  const handleClick = event => {
    handleNodeClick(event, group.id, group);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <TreeItem
      nodeId={group.id}
      classes= {{
        root: classes.itemRoot,
        content: clsx(classes.itemRow, {[classes.selected]: isSelected(group.id)}),
        expanded: classes.expanded,
        label: clsx(classes.itemContent, {
          [classes.dense]: dense,
          [classes.selected]: isSelected(group.id)
        })
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      label={group.name}
    >
      { renderChildren }  
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
   * the group data of this tree node
   */
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
    isAleaf: PropTypes.bool,
  }).isRequired,

  /**
   * override default behaviour: render `children` instead of 
   * recursivley generate them from the given `group` prop
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

};

const mapStateToProps = (state, ownProps) => ({
  group: selectGroupByid(state, ownProps.nodeId),
});

const ConnectedTreeItem = connect(
  mapStateToProps,
)(wrapFetch(RecursiveTreeItem));

ConnectedTreeItem.muiName = TreeItem.muiName;

ConnectedTreeItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
} 

export default ConnectedTreeItem;
