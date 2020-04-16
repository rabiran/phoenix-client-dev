import React, { useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeListContext from './TreeListContext';
import { selectGroupByid } from '../groupsSlice';
import wrapFetch from './wrapFetch';
import VisibilityOptimizer from 'utils/visibilityObserver/VisibilityOptimizer';
import { DEFAULT_VISIBILITY_CHILDREN_THRESHOLD } from './TreeList'


export const RecursiveTreeItem = (props) => {
  const {
    id,
    label,
    nestedItemsIds,
    onClick,
    onKeyDown,
    children,
  } = props;

  const {
    dense,
    classes,
  } = useContext(TreeListContext);

  const defaultVisibility = nestedItemsIds.length < DEFAULT_VISIBILITY_CHILDREN_THRESHOLD;

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
        expanded: classes.expanded,
        selected: classes.selected,
        label: clsx(classes.itemContent, {
          [classes.dense]: dense,
        })
      }}
      onClick={onClick}
      onKeyDown={onKeyDown}
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
