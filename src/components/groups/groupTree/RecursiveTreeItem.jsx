import React, { useContext, forwardRef } from 'react';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeListContext from './TreeListContext';
import { selectGroupByid, areChildrenFetched, selectChildrenIds } from '../../../features/groups/groupsSlice';
import VisibilityOptimizer from 'components/shared/visibilityObserver/VisibilityOptimizer';
import { DEFAULT_VISIBILITY_CHILDREN_THRESHOLD } from './TreeList'

const LEFT_ARROW_KEY = 'ArrowLeft', RIGHT_ARROW_KEY = 'ArrowRight';

export const RecursiveTreeItem = forwardRef((props, ref) => {
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
    classes,
    handleLoad,
    itemHeight,
  } = useContext(TreeListContext);

  const theme = useTheme();
  const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;
  const childrenIds = nestedItemsIds || [];
  const defaultVisibility = childrenIds.length < DEFAULT_VISIBILITY_CHILDREN_THRESHOLD;

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

  // if there are no chilren but not a leaf - render "loading"
  const renderChildren = childrenIds.length === 0 && !isLeaf ? 
    loadingComponent :
    childrenIds.map(childId => 
      <VisibilityOptimizer
        key={childId}
        nodeId={childId}
        invisibleStyles={{ height: itemHeight }}
        render={props => (<ConnectedTreeItem {...props}/>)}
        defaultVisibility={defaultVisibility}
      />
  );

  return (
    <TreeItem
      ref={ref}
      nodeId={id}
      classes= {{
        root: classes.itemRoot,
        content: classes.itemRow,
        group: classes.itemChildren,
        expanded: classes.expanded,
        selected: classes.selected,
        label: classes.itemContent, 
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      label={label}
    >
      { renderChildren }  
    </TreeItem>
  );
});

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
  nestedItemsIds: PropTypes.arrayOf(PropTypes.string),
  /**
   * Whether this item has children, when set to `false` but the `nestedItemsIds`
   * is not set or empty - `loadingComponent` will be rendered as a single child
   */
  isLeaf: PropTypes.bool,
  /**
   * Element to render when no `nestedItemsIds` supplied (or empty) and `isLeaf` is set to `false`
   */
  loadingComponent: PropTypes.element,
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.nodeId;
  const { children, name: label, isAleaf: isLeaf } = selectGroupByid(state, id);
  const childrenFetched = areChildrenFetched(state, id);

  let nestedItemsIds = null;
  if(!isLeaf && childrenFetched) {
    nestedItemsIds = selectChildrenIds(state, id);
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
