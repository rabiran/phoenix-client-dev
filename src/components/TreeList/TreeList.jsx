import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import TreeListConetxt from './TreeListContext';
import RecursiveTreeItem  from './RecursiveTreeItem';
import { selectRootGroups } from 'features/groups/groupsSlice';

/**
 * ---------- itemRoot --------------
 *  ---------itemContent--------    |
 * |  |\   -------------------  |   |
 * |  | + |      Button       | |   |
 * |  |/   -------------------  |   |
 *  ----------------------------    |
 *      { children items }          |
 *              :                   |
 * ----------------------------------
 * itemRoot contains the itemContent and it's children
 * focus event occurs on the itemRoot, but styles should be applied to the itemContent
 */
export const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.default,
  },
  /* styles applied to the 'treeItem' component's 'root' */
  itemRoot: {
    // '&$expanded': {
    //   backgroundColor: green[100],
    // },
    '&:focus > $itemContent$selected': {
      backgroundColor: theme.palette.action.selected,
    }
  },
  /* styles applied to the 'treeItem' component's 'content' */
  itemContent: {
    '&:hover': {
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
    '&$selected, &$selected:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  /* styles applied to the 'button' component (inside itemContent) */
  button: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  /* styles applied to the button component if dense */
  dense: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  /* pseudo class applied to the itemContent when selected */
  selected: {},
  /* pseudo class applied to the itemRoot when expanded */
  expanded: {},
});

const TreeList = (props) => {
  const { 
    rootData,
    selected,
    onNodeSelected,
    expanded,
    onNodeToggle,
    onKeyDown,
    onClick,
    loadData,
    classes,
    dense,
  } = props;

  const isSelected = useCallback(id => id === selected, [selected]);
  const loadDataCb =  useCallback(id => {
    if(loadData) loadData(id);
  }, [loadData]); 

  const handleKeyDown = (event, id) => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
        onNodeSelected(event, id);
        break;
      default:
        break;
    }
    if (onKeyDown) {
      onKeyDown(event);
    } 
  };

  const handleNodeClick = (event, id) => {
    onNodeSelected(event, id);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <TreeListConetxt.Provider
      value={{
        isSelected,
        handleNodeClick,
        handleKeyDown,
        dense,
        loadData: loadDataCb,
      }}
    >
      <TreeView
        className={classes.root}
        expanded={expanded}
        onNodeToggle={onNodeToggle}
        defaultExpandIcon={<ExpandMoreIcon/>}
        defaultCollapseIcon={<ChevronLeftIcon/>}   
      >
        { 
          rootData.map(item => 
          <RecursiveTreeItem 
            classes={classes} 
            key={item.id} 
            nodeId={item.id} 
          />)
        }
      </TreeView>
    </TreeListConetxt.Provider>
  );
}

TreeList.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * array of root data items (top level items), each item may contain an array of children items 
   * which will be displayed as a nested list
   */
  rootData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name:  PropTypes.string.isRequired,
    children: PropTypes.array,
  })),
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
  onNodeSelected: PropTypes.func.isRequired,
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
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback fired when tree node need it's children data.
   * shape: (id: string) => void
   * this callback (probably) should trigger an API call to fetch the data.
   * @param {string} id The node's id
   */
  loadData: PropTypes.func,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * component to render when the nested items (of a parent item) has not 
   * been loaded yet (but their ids are known)
   */
  dummyChildrenComponent: PropTypes.element,
}

const mapStateToProps = (state, ownProps) => ({
  rootData: selectRootGroups(state),
});

const ConnectedTreeList = connect(
  mapStateToProps,
)(TreeList);

export const StyledTreeList = withStyles(styles)(TreeList);

export default withStyles(styles)(ConnectedTreeList);
