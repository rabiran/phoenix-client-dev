import React from 'react';
import './App.css';
import Header from './components/Header';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/RTL';
import ManagePage from './components/ManagePage/ManagePage';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
      <RTL>
        <ThemeProvider theme={theme}>
            <Header/>
            <Router>
              <Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route path='/managepage' component={()=><ManagePage type="טיפש"/>} />
              </Switch>
            </Router>
        </ThemeProvider>
      </RTL>
  );
}

export default App;
