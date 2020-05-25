import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { selectIsOpen, hideError } from 'features/errorSlice';

const Notifier = props => {
  const dispatch = useDispatch();
  const open = useSelector(selectIsOpen);
  const handleClose = () => dispatch(hideError())

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={handleClose}>
      <Alert 
        onClose={handleClose} 
        severity="error"
        variant="filled"
        action= {
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        }>
        ארעה שגיאה
      </Alert>
    </Snackbar>
  )
};

export default Notifier;
