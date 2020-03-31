import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/RTL';
import ManagePage from './components/ManagePage/ManagePage';
import LandingPage from './components/LandingPage/LandingPage';
import TreeDemo from './components/TreeListDemo/TreeDemo';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GridDemo from './components/GridDemo/GridDemo';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider theme={theme}>
            <Header/>
            <Router>
              <Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route path='/managepage' component={ManagePage} />
                  <Route path='/treeDemo' component={TreeDemo}/>
                  <Route path='/grid' component={GridDemo}/>
                  <Route path='/main' component={MainPage}/>
              </Switch>
            </Router>
        </ThemeProvider>
      </RTL>  
    </Provider>
  );
}

export default App;
