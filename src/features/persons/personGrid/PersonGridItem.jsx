import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { selectById } from '../personsSlice';
import PropTypes from 'prop-types';

const styles = makeStyles({
  root: {
    width: '75px',
  },
  label: {
    textAlign: 'center', 
    wordWrap: 'break-word', 
    // width: '75px'
  },
  avatar: {
    width: '70px', 
    height: '70px', 
    margin: '0 auto' // equal margin in left & right - avatar in center
  },
});

export const PersonGridItem = React.memo (props => {
  const { label } = props;
  const classes = styles(props);
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}></Avatar>    
      <div className={classes.label}><Typography>{ label }</Typography></div>
    </div>
  );
});

PersonGridItem.propTypes = {
  label: PropTypes.string.isRequired,
}

export default PersonGridItem;
