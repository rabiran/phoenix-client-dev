import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles, useTheme } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';
import { selectGroupByid } from '../groupsSlice';

const NOT_TABABLE = -1, LEFT_ARROW_KEY = 'ArrowLeft', RIGHT_ARROW_KEY = 'ArrowRight';

const CleanButton = withStyles({
  root: {
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
}, { name: 'CleanButton' })(Button);
CleanButton.muiName = Button.muiName;

const Spinner = withStyles({
  root: {
    marginTop: '2px',
  }
})(CircularProgress);
Spinner.muiName = CircularProgress.muiName;

export const RecursiveTreeItem = (props) => {
  const {
    group,
  } = props;

  const {
    isSelected,
    handleNodeClick,
    handleNodeKeyDown,
    loadData,
    dense,
    classes,
  } = useContext(TreeListContext);

  const theme = useTheme();

  const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;
  const nestedItems = group.children ? group.children : [];
  const renderDummy = nestedItems.length === 0 && !group.isAleaf;

  const children = renderDummy ? 
  // <></>:
  <Spinner/>:
  nestedItems.map(childId => 
    <ConnectedTreeItem
      key={childId}
      nodeId={childId}
    />
  );

  const handleKeyDown = event => {
    const key = event.key;
    switch (key) {
      case 'Enter':
      case ' ':
      case nextArrowKey:
        // request the real children data
        if(renderDummy && loadData) loadData(group.id);
        handleNodeKeyDown(event, group.id, group)
        break;
      default:
        break;
    }
  }

  const handleClick = event => {
    // request the real children data
    if(renderDummy && loadData) loadData(group.id);
    handleNodeClick(event, group.id, group);
  };

  return (
    <TreeItem
      nodeId={group.id}
      classes= {{
        root: classes.itemRoot,
        content: clsx(classes.itemRow, {[classes.selected]: isSelected(group.id)}),
        expanded: classes.expanded,
      }}
      onClick={handleClick}
      onKeyDown={e=> handleKeyDown(e, group.id)}
      label={
      <CleanButton
        tabIndex={NOT_TABABLE}
        classes={{
          root: clsx(
            classes.itemContent, { 
              [classes.dense]: dense, 
              [classes.selected]: isSelected(group.id),
            })
        }}
      >
        { group.name }
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
   * the group data of this tree node
   */
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,
    isAleaf: PropTypes.bool,
  }).isRequired,


};

const mapStateToProps = (state, ownProps) => ({
  group: selectGroupByid(state, ownProps.nodeId),
});

const ConnectedTreeItem = connect(
  mapStateToProps,
)(RecursiveTreeItem);

export default ConnectedTreeItem;
