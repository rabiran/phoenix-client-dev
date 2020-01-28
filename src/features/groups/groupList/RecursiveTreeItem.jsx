import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TreeListContext from './TreeListContext';
import { selectGroupByid } from '../groupsSlice';

const NOT_TABABLE = -1;

const CleanButton = withStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  // label: {
  //   fontWeight: 'bold',
  // },
}, { name: 'CleanButton' })(Button);
CleanButton.muiName = Button.muiName;

export const RecursiveTreeItem = (props) => {
  const {
    group,
  } = props;

  const {
    isSelected,
    handleNodeClick,
    handleKeyDown,
    loadData,
    dense,
    classes,
  } = useContext(TreeListContext);

  const nestedItems = group.children ? group.children : [];
  const renderDummy = nestedItems.length === 0 && !group.isAleaf;

  const children = renderDummy ? 
  <></>:
  nestedItems.map(childId => 
    <ConnectedTreeItem
      key={childId}
      nodeId={childId}
    />
  );

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
        content: clsx(classes.itemContent, {[classes.selected]: isSelected(group.id)}),
        expanded: classes.expanded,
      }}
      onClick={handleClick}
      onKeyDown={e=> handleKeyDown(e, group.id)}
      label={
      <CleanButton
        tabIndex={NOT_TABABLE}
        classes={{
          root: clsx(
            classes.button, 
            { 
              [classes.dense]: dense, 
              [classes.selected]: isSelected(group.id),
            }
          )
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
