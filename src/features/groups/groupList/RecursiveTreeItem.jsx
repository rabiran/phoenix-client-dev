import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeListContext from './TreeListContext';
import { selectGroupByid, isChildrenFetched } from '../groupsSlice';
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
    isLeaf = !nestedItemsIds || nestedItemsIds.length === 0,
    loadingComponent = <></>,
  } = props;

  const {
    dense,
    classes,
    handleLoad,
  } = useContext(TreeListContext);

  const theme = useTheme();
  const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;

  const defaultVisibility = (nestedItemsIds || []).length < DEFAULT_VISIBILITY_CHILDREN_THRESHOLD;

  const handleClick = event => {
    if (!isLeaf) {
      handleLoad(id);
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
          handleLoad(id); 
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
  const renderChildren = (!nestedItemsIds || nestedItemsIds.length === 0) && !isLeaf ? 
    loadingComponent :
    (nestedItemsIds || []).map(childId => 
      <VisibilityOptimizer
        key={childId}
        nodeId={childId}
        render={props => (<ConnectedTreeItem {...props}/>)}
        defaultVisibility={defaultVisibility}
      />
      // <ConnectedTreeItem 
      //   key={childId}
      //   nodeId={childId}
      // />
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
      // TransitionProps={{timeout: theme.transitions.duration.shortest}}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
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
   * function called when the component needs more children.
   * signature: `(id: string) => void`
   */
  loadData: PropTypes.func,
  /**
   * 
   */
  isLeaf: PropTypes.bool,
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
  const { children, name: label, isAleaf: isLeaf } = selectGroupByid(state, id);
  const childrenFetched = isChildrenFetched(state, id);

  let nestedItemsIds = null;
  if(!isLeaf && childrenFetched) {
    nestedItemsIds = children;
  }

  return {
    id,
    nestedItemsIds,
    label,
    isLeaf,
  };
};


const ConnectedTreeItem = connect(
  mapStateToProps,
)(RecursiveTreeItem);

ConnectedTreeItem.muiName = TreeItem.muiName;

ConnectedTreeItem.propTypes = {
  nodeId: PropTypes.string.isRequired,
}; 

export default ConnectedTreeItem;
