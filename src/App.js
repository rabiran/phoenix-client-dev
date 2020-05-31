import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
// import { SnackbarProvider } from 'material-ui-snackbar-provider';
// import Alert from './components/Stuff/Alert';
import './App.css';
import Header from './components/Header';
import { theme } from './theme.js';
import RTL from './components/RTL';
import ManagePage from './components/ManagePage/ManagePage';
import LandingPage from './components/LandingPage/LandingPage';
import AlertProvider from './components/providers/AlertProvider/AlertProvider';
// import Alert from './components/Stuff/Alert';
// import Snackbar from '@material-ui/core/Snackbar';

function App() {
    // const [isAlert, setOpenAlert] = React.useState(false);
    // const [AlertMessage, setAlertMessage] = React.useState("warning");
    // const [AlertSeverity, setAlertSeverity] = React.useState("something");

    // const onAlertClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenAlert(false);
    // };

    // function openAlert (type, message){
    //     setAlertMessage(message);
    //     setAlertSeverity(type);
    //     setOpenAlert(true);
    // }

    return (
        <RTL>
            <ThemeProvider theme={theme}>
                <AlertProvider>
                {/* <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 , anchorOrigin: { vertical: 'bottom', horizontal: 'left' }}}> */}
                    <Header />
                    <Router>
                        <Switch>
                            <Route exact path='/' component={LandingPage} />
                            <Route path='/cookspage' component={() => <ManagePage/>} />
                            <Route path='/hrspage' component={() => <ManagePage />} />
                        </Switch>
                    </Router>
                    {/* <Snackbar open={isAlert} autoHideDuration={4000} onClose={onAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Alert onClose={onAlertClose} severity={AlertSeverity} className="alertAnimate">
                            {AlertMessage}
                        </Alert>
                    </Snackbar> */}
                {/* </SnackbarProvider> */}
                </AlertProvider>
            </ThemeProvider>
        </RTL>
    );
}
// openAlert={openAlert}
export default App;
