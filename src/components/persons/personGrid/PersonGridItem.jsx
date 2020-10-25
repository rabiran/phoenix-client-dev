import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const AVATAR_MARGIN = 5;

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

export const PersonGridItem = ({
  label,
  height,
  width,
  avatarSize,
  style
}) => {
  const itemWidth = (!!style && style.width) || width;
  const defaultAvatarSize = itemWidth ? itemWidth - 2 * AVATAR_MARGIN : null;
  const classes = styles({ height, width, avatarSize: avatarSize || defaultAvatarSize }); 
  return (
    <div className={classes.root} style={style}>
      <Avatar className={classes.avatar}/>    
      <div className={classes.label}><Typography>{ label }</Typography></div>
    </div>
  );
}

PersonGridItem.propTypes = {
  /**
   * Text to render below the avatar
   */
  label: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  /**
   * Avatar width & height (in pixels)
   */
  avatarSize: PropTypes.number
}

export default PersonGridItem;