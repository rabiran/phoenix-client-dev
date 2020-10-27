import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  root: {},
  avatar: ({ avatarSize = 170 }) => ({
    width: avatarSize,
    height: avatarSize,
    margin: 'auto auto',
  }),
  avatarContainer: {
    height: '100%',
    display: 'flex',
    paddingLeft: '5px'
  },
  description: {
    padding: 30,
    paddingLeft: 70,
  }
})

const UserDescription = (props) => {
  const {
    fullName,
    job,
    hierarchy,
  } = props
  const classes = styles(props);
  return (
    <Grid container className={classes.root} wrap='nowrap'>
      <Grid item className={classes.avatarContainer}>
        <Avatar className={classes.avatar} />
      </Grid>
      <Grid item className={classes.description}>
        <Typography variant='h3'>{`${fullName} | ${job}`}</Typography>
        <Typography variant='h5'>{hierarchy.join(' | ')}</Typography>
      </Grid>
    </Grid>
  )
}

export default UserDescription;
