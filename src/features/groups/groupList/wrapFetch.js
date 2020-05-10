import React from 'react';
import { useTheme, withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { areChildrenFetched, fetchSubtreeIfNeeded, selectGroupByid } from 'features/groups/groupsSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';


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
      childrenFetched,
      isLeaf,
      ...passThrough
    } = props;

    const handleClick = event => {
      if(!isLeaf) {
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
          if(!isLeaf) {
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
    // const renderDummy = (!group.children || group.children.length === 0) && !group.isAleaf;
    const renderDummy = !isLeaf && !childrenFetched;
    return (
      <WrappedComponent
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        { ...passThrough }
        children={ renderDummy && <Spinner/> }
      />
    );
  };
  Wrapped.displayName = `wrapFetch(${WrappedComponent.name})`;
  Wrapped.propTypes = {
    childrenFetched: PropTypes.bool,
    isLeaf: PropTypes.bool,
    loadData: PropTypes.func.isRequired,
  }
  return Wrapped;
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;
  const { isAleaf: isLeaf } = selectGroupByid(state, id);
  const childrenFetched = areChildrenFetched(state, id);
  return {
    childrenFetched,
    isLeaf,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: () => dispatch(fetchSubtreeIfNeeded(ownProps.id)),
  };
};

const wrap = (wrappedComponent) => connect(mapStateToProps, mapDispatchToProps)(wrapFetch(wrappedComponent));

export default wrap;