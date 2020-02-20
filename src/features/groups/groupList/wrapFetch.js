import React, { useState } from 'react';
import { useTheme, withStyles } from '@material-ui/styles';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchChildrenRequest, isChildrenFetched, isSubtreeLoaded } from 'features/groups/groupsSlice';
import CircularProgress from '@material-ui/core/CircularProgress';


const Spinner = withStyles({
  root: {
    marginTop: '2px',
  }
})(CircularProgress);
Spinner.muiName = CircularProgress.muiName;

const LEFT_ARROW_KEY = 'ArrowLeft', RIGHT_ARROW_KEY = 'ArrowRight';

const wrapFetch = WrappedComponent => {
  const Wrapped = props => {
    const theme = useTheme();
    const nextArrowKey = theme.direction === 'rtl' ? LEFT_ARROW_KEY : RIGHT_ARROW_KEY;
    const { 
      onClick,
      onKeyDown,
      loadData,
      group,
      childrenFetched,
      loadCalled,
      ...rest
    } = props;

    const passThrough = { group, ...rest };

    const handleClick = event => {
      if(!loadCalled && !group.isAleaf) {
        loadData(group.id);
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
          if(!loadCalled && !group.isAleaf) {
            loadData(group.id); 
          }
          break;  
        default:
          break;
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
    };
    // const renderDummy = (!group.children || group.children.length === 0) && !group.isAleaf;
    const renderDummy = !group.isAleaf && !childrenFetched;
    return (
      <WrappedComponent
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        { ...passThrough }
        children={ renderDummy && <></> }
      />
    );
  };
  Wrapped.displayName = `wrapFetch(${WrappedComponent.name})`;
  return Wrapped;
};

const mapStateToProps = (state, ownProps) => ({
  childrenFetched: isChildrenFetched(state, ownProps.group.id),
  loadCalled: isSubtreeLoaded(state, ownProps.group.id)
});

const mapDispatchToProps = {
  loadData: fetchChildrenRequest,
};

const wrap = (wrappedComponent) => connect(mapStateToProps, mapDispatchToProps)(wrapFetch(wrappedComponent));

export default wrap;