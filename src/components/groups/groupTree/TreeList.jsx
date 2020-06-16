import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ChevronLeft';
import CollapseIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import TreeListConetxt from './TreeListContext';
import RecursiveTreeItem  from './RecursiveTreeItem';
import { selectRootGroupsIds, fetchSubtreeIfNeeded } from 'features/groups/groupsSlice';

export const DEFAULT_VISIBILITY_CHILDREN_THRESHOLD = 50;

/**
 * ---------- itemRoot --------------
 *  ---------itemRow------------    |
 * |  |\   -------------------  |   |
 * |  | + |    itemContent    | |   |
 * |  |/   -------------------  |   |
 *  ----------------------------    |
 *     -----itemChildren----        |
 *    |  { children items } |       |
 *    |          :          |       |
 *     ---------------------        |
 * ----------------------------------
 * non-top level itemRoot is contained in a `div` that contains itemrow and it's children
 * focus & selected events occurs on the itemRoot, but styles should be applied to the itemRow
 */
export const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    '& > $itemRoot  > $itemRow': {
      fontWeight: 'bold',
    },
  },  
  /* styles applied to the 'treeItem' component's 'root' */
  itemRoot: {
    // selected, selected and focus 
    '&$selected > $itemRow, &$selected:focus > $itemRow': {
      color: theme.palette.primary.contrastText,
      fontWeight: 'bold',
      backgroundColor: theme.palette.action.selected,
    },
    // "disable" content's selected & focus (styles are already applied to "itemRow")
    '&$selected > $itemRow $itemContent, &:focus > $itemRow $itemContent': {
      backgroundColor: 'transparent',
    },
    // focus (overrides itemRow hover due to larger specifity)
    '&:focus > $itemRow': {
      backgroundColor: theme.palette.action.hover,
    }
    // '&$expanded': {
    //   backgroundColor: theme.palette.action.expanded,
    // },
    // '&$expanded > $itemRow': {
    //   fontWeight: 'bold',
    // },
  },
  /* styles applied to the 'treeItem' component's 'content' */
  itemRow: ({itemHeight}) => ({
    height: itemHeight || '44px',
    '&:hover': {
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
  }),
  /* styles applied to the 'role=group' component (itemRow direct child) */
  itemChildren: {},
  /* styles applied to the 'itemContent' component (inside itemRow) */
  itemContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    // paddingTop: 10,
    // paddingBottom: 10,
    fontWeight: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:only-child': {
      paddingLeft: 10
    }
  },
  /* pseudo class applied to the itemRoot when selected */
  selected: {},
  /* pseudo class applied to the itemRoot when expanded */
  expanded: {},
});

const TreeList = (props) => {
  const { 
    rootIds,
    selected,
    onNodeSelected,
    expanded,
    onNodeToggle,
    classes,
    loadData,
    itemHeight = '44px',
  } = props;

  const handleLoad = id => {
    loadData(id);
  };
 
  return (
    <TreeListConetxt.Provider
      value={{
        classes,
        handleLoad,
        itemHeight
      }}
    >
      <TreeView
        className={classes.root}
        expanded={expanded}
        onNodeToggle={onNodeToggle}
        selected={selected}
        onNodeSelect={onNodeSelected}
        defaultExpandIcon={<ExpandMoreIcon/>}
        defaultCollapseIcon={<CollapseIcon/>}   
      >
        { rootIds.map(id => <RecursiveTreeItem key={id} nodeId={id} />) }
      </TreeView>
    </TreeListConetxt.Provider>
  );
};

TreeList.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * ids Of the root Groups
   */
  rootIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * The id of the selected item. (Controlled)
   */
  selected: PropTypes.string,
  /**
   * Callback fired when tree item is selected
   * 
   * @param {object} event The event source of the callback
   * @param {string} id The id of the selected item
   */
  onNodeSelected: PropTypes.func,
  /**
   * Expanded items ids. (Controlled)
   */
  expanded: PropTypes.arrayOf(PropTypes.string),
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {object} event The event source of the callback
   * @param {Array} nodeIds The ids of the expanded items.
   */
  onNodeToggle: PropTypes.func,
  /**
   * Callback fired once for every item that have children, it's 
   * purpose is to load the children of the item.
   * Its signature is: `(id: string) => void`, where `id`
   * is the id of the item to load data for.
   */
  loadData: PropTypes.func,
};

const mapStateToProps = state => ({
  rootIds: selectRootGroupsIds(state),
});

const mapDispatchToProps = dispatch => {
  return {
    loadData: id => dispatch(fetchSubtreeIfNeeded(id)),
  };
}

const ConnectedTreeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeList);

export const StyledTreeList = withStyles(styles)(TreeList);

export default withStyles(styles)(ConnectedTreeList);
