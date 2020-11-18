import React from 'react';
import Box from '@material-ui/core/Box';
import UserDescription from './UserDescription';
import { makeStyles } from '@material-ui/styles';
import UserDetails from 'components/persons/personDetails/PersonDetails';


const SquareSize = 30;
const SquareTopOffset = 21.213;

const styles = makeStyles(theme => ({
  root: ({ height }) =>  ({
    height,
    display: 'flex',
    boxShadow: '0px 0px 5px 0px rgba(125,120,125,0.8)',
    position: 'relative',
    '&:before': {
      position: 'absolute',
      top: `calc(50% - ${SquareTopOffset}px)`,
      left: '50%',
      content: '" "',
      height: SquareSize,
      width: SquareSize,
      backgroundColor: '#E4EAEA',
      transformOrigin: '0% 0%',
      transform: 'rotate(45deg)',
      zIndex: 1,
  },
  }),
  description: {
    width: '50%',
  },
  details: {
    width: '50%',
    boxSizing: 'border-box',
    '-moz-box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    background: 'rgb(199, 216, 216)',
    display: 'flex',
    paddingLeft: theme.spacing(2)
  },
}));

const UserInfo = (props) => {
  const {
    user: { 
      job, 
      fullName, 
      hierarchy,
      ...details
    },
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
        <UserDetails { ...details } />
      </div>
    </Box>
  );
}

export default UserInfo;