import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { useHistory, useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from 'components/shared/Loading/Spinner';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    // color: '#fff',
  },
  spinner: {
    color: 'white',
  }
}));

const Authenticating = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const history = useHistory();
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } };
  useEffect(() => {
    if(isAuthenticated) {
      history.replace(from);
    }
  }, [isAuthenticated, history, from]);

  return (
    <Backdrop className={classes.backdrop} open={!isAuthenticated}>
      <Spinner className={classes.spinner}/>
    </Backdrop>
  );
}

export default Authenticating;
