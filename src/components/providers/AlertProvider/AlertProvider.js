import React from 'react';
import '../../../App.css';
import Alert from '../../Stuff/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AlertContext from './AlertContext';


export default function AlertProvider(props) {
    const contextValue = {
        openAlert: openAlert
    }

    const [isAlert, setOpenAlert] = React.useState(false);
    const [AlertMessage, setAlertMessage] = React.useState("warning");
    const [AlertSeverity, setAlertSeverity] = React.useState("something");

    const onAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    function openAlert (type, message) {
        setAlertMessage(message);
        setAlertSeverity(type);
        setOpenAlert(true);
    }

    return (
        <>
            <AlertContext.Provider value={contextValue}>
                {props.children}
            </AlertContext.Provider>
            <Snackbar open={isAlert} autoHideDuration={4000} onClose={onAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={onAlertClose} severity={AlertSeverity} className="alertAnimate">
                    {AlertMessage}
                </Alert>
            </Snackbar>
        </>
    );
}


