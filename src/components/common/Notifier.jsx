import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { selectIsOpen, hideError, selectErrorObj, clearError } from 'features/errorSlice';

const DEFAULT_TEXT = 'ארעה שגיאה'

const Notifier = props => {
  const dispatch = useDispatch();
  const open = useSelector(selectIsOpen);
  const error = useSelector(selectErrorObj);
  const handleClose = () => dispatch(hideError())
  const handleExited = () => dispatch(clearError())
  const message = error ? error.message || DEFAULT_TEXT : '';

  return (
    <Snackbar 
      open={open && error} 
      autoHideDuration={4000} 
      onClose={handleClose}
      onExited={handleExited}>
      <Alert 
        onClose={handleClose} 
        severity="error"
        variant="filled"
        action= {
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        }>
        { message }
      </Alert>
    </Snackbar>
  )
};

export default Notifier;
