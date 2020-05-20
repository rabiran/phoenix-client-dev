import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = makeStyles({
  root: ({ width, height }) => ({
    width,
    height,
    overflow: 'hidden'
  }),
  label: {
    textAlign: 'center', 
    wordWrap: 'break-word', 
  },
  avatar: ({ avatarSize }) => ({
    width: avatarSize, 
    height: avatarSize,
    margin: '0 auto' // equal margin in left & right - avatar in center
  }),
});

export const PersonGridItem = props => {
  const { 
    label,
  } = props;
  const classes = styles(props);
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}></Avatar>    
      <div className={classes.label}><Typography>{ label }</Typography></div>
    </div>
  );
}

PersonGridItem.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  avatarSize: PropTypes.number
}

export default PersonGridItem;
