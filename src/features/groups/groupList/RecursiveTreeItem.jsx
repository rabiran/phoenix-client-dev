import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeListContext from './TreeListContext';
import { selectGroupByid } from '../groupsSlice';
import wrapFetch from './wrapFetch';
import VisibilityOptimizer from 'utils/visibilityObserver/VisibilityOptimizer';
import { DEFAULT_VISIBILITY_CHILDREN_THRESHOLD } from './TreeList'

const LEFT_ARROW_KEY = 'ArrowLeft', RIGHT_ARROW_KEY = 'ArrowRight';

export const RecursiveTreeItem = (props) => {
  const {
    id,
    label,
    nestedItemsIds,
    onClick,
    onKeyDown,
    children,
    loadData,
    isLeaf = !nestedItemsIds || nestedItemsIds.length === 0,
    childrenFetched = true,
    loadingComponent = <></>,
  } = props;

  const {
    dense,
    classes,
  } = useContext(TreeListContext);

  const theme = useTheme();
  const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;

  const defaultVisibility = nestedItemsIds.length < DEFAULT_VISIBILITY_CHILDREN_THRESHOLD;

  const handleClick = event => {
    if (!isLeaf) {
      loadData();
    }
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = event => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
      case nextArrowKey:
        if (!isLeaf) {
          loadData(); 
        }
        break;  
      default:
        break;
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  // if children given - render them
  const renderChildren = children ? children :
  nestedItemsIds.map(childId => 
    <VisibilityOptimizer
      key={childId}
      nodeId={childId}
      render={props => (<ConnectedTreeItem {...props}/>)}
      defaultVisibility={defaultVisibility}
    />
  );

  return (
    <TreeItem
      nodeId={id}
      classes= {{
        root: classes.itemRoot,
        content: classes.itemRow,
        group: classes.itemChildren,
        expanded: classes.expanded,
        selected: classes.selected,
        label: clsx(classes.itemContent, {
          [classes.dense]: dense,
        })
      }}
      onClick={loadData ? handleClick : onClick}
      onKeyDown={loadData ? onKeyDown : onKeyDown}
      label={label}
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
  id: PropTypes.string.isRequired,
  /**
   * The text to display
   */
  label: PropTypes.string.isRequired,
  /**
   * The ids of the nested items
   */
  nestedItemsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Override the default behaviour: render `children` instead of 
   * recursivley render `RecursiveTreeItem` from the given `nestedItemsIds`
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.nodeId;
  const { children: nestedItemsIds, name: label } = selectGroupByid(state, id);
  return {
    id,
    nestedItemsIds,
    label,
  };
};

const ConnectedTreeItem = connect(
  mapStateToProps,
)(wrapFetch(RecursiveTreeItem));

ConnectedTreeItem.muiName = TreeItem.muiName;

ConnectedTreeItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
}; 

export default ConnectedTreeItem;
