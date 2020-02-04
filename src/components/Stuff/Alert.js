import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function CustomizedSnackbars(props) {
//     const classes = useStyles();
//     const [open, setOpen] = React.useState(false);
  
//     const handleClick = () => {
//       setOpen(true);
//     };
  
//     const handleClose = (event, reason) => {
//       if (reason === 'clickaway') {
//         return;
//       }
  
//       setOpen(false);
//     };
  
//     return (
//       <div className={classes.root}>
//         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity={props.type}>
//             {props.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     );
//   }