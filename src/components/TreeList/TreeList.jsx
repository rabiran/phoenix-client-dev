import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';

const CleanButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
}, { name: 'CleanButton' })(Button);
CleanButton.muiName = Button.muiName;


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
 * focus occurs on the itemRoot, but styles should be applied to the itemContent
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
    paddingTop: 8,
    paddingBottom: 8,
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
    data,
    selected,
    onNodeSelected,
    expanded,
    onNodeToggle,
    onKeyDown,
    onClick,
    onFocus,
    dummyChildrenComponent,
    classes,
    dense,
    ...other
  } = props;

  const [focused, setFocused] = useState(null);
  const dummyChildren = dummyChildrenComponent ? dummyChildrenComponent : <Skeleton height={40} variant='rect'>loading</Skeleton>; 

  // recursive function to rendrer data
  const listJsx = (data, d = 0) => {
    return data.map(item => {
      const id = item.id;
      const children = item.children ? item.children : [];
      const renderDummyChildren = children.length > 0 && !children[0].id;
      const isSelected = selected === id;
      return (
         <TreeItem
          // level={d}
          // className={clsx({[classes.nodeSelected]: isSelected})}
          classes= {{
            root: classes.itemRoot,
            content: clsx(classes.itemContent, {[classes.selected]: isSelected}),
            expanded: classes.expanded,
          }}
          onFocus={e => handleNodeFocus(e, id)}
          onClick={e => handleNodeClick(e, id)}
          key={id} 
          nodeId={id}
          onKeyDown={handleKeyDown}
          selected={isSelected}
          label={
          <CleanButton
            classes={{
              root: clsx(
                classes.button, 
                { [classes.dense]: dense }
              ) 
            }}
          >
            { item.value }
          </CleanButton>
          // item.value
          }
        >
          { renderDummyChildren ? dummyChildren : listJsx(children, d + 1) }
        </TreeItem>   
      )
    })
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
        onNodeSelected(event, focused);
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
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

  const handleNodeFocus = (event, id) => {
    event.stopPropagation();
    setFocused(id);
    if(onFocus) {
      onFocus(event);
    }
  };

  return (
    <TreeView
      className={classes.root}
      expanded={expanded}
      onNodeToggle={onNodeToggle}
      defaultExpandIcon={<ExpandMoreIcon/>}
      defaultCollapseIcon={<ChevronLeftIcon/>}
      {...other}
    >
      { listJsx(data) }
    </TreeView>
  );
}

TreeList.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * array of data items (top level items), each item may contain an array of children items 
   * which will be displayed as a nested list
   */
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
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
   * @param {array} nodeIds The ids of the expanded items.
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
   * If `true`, compact vertical padding designed for keyboard and mouse input will be used.
   */
  dense: PropTypes.bool,
  /**
   * component to render when the nested items (of a parent item) has not 
   * been loaded yet (but their ids are known)
   */
  dummyChildrenComponent: PropTypes.element,
}


export default withStyles(styles)(TreeList);
