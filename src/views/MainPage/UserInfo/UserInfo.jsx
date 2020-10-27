import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import UserDescription from './UserDescription';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import UserDetails from './UserDetails';


const styles = makeStyles(theme => ({
  root: ({ height }) =>  ({
    height,
    display: 'flex',
    boxShadow: '0px 0px 5px 0px rgba(125,120,125,0.8)',
    position: 'relative',
  }),
  description: {
    width: '50%',
  },
  details: {
    width: '50%',
    background: 'rgb(199, 216, 216)',
    display: 'flex',
  }
}))

const UserInfo = (props) => {
  const {
    user: { 
      job, 
      fullName, 
      hierarchy,
      ...details
    }
  } = props;
  const classes = styles(props)
  return (
    <Box className={classes.root}>
      <UserDescription 
        fullName={ fullName } 
        job={ job } 
        hierarchy={hierarchy}
        classes={{
          root: classes.description
        }}
      />
      <div className={classes.details}>
        <UserDetails { ...details }/>
      </div>
    </Box>
  );
}

export default UserInfo;