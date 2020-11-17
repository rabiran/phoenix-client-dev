import React from 'react';
import Kermit from 'assets/images/kermit.jpg'
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  img: {
    width: 270,
    height: 350,
  }
})

export default () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        src={Kermit}
        alt='frogggg'
      />
    </div>
  )
};
