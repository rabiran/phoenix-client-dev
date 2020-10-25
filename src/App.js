import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/common/RTL';
import ManagePage from './views/ManagePage/ManagePage';
import TreeDemo from './views/TreeListDemo/TreeDemo';
import Header from './components/common/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GridDemo from './views/GridDemo/GridDemo';
import MainPage from './views/MainPage/MainPage';
import Notifier from 'components/common/Notifier';

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider theme={theme}>
            <Header/>
            <Router>
              <Switch>
                  {/* <Route exact path='/' component={LandingPage} /> */}
                  <Route path='/managepage' component={ManagePage} />
                  <Route path='/treeDemo' component={TreeDemo}/>
                  <Route path='/grid' component={GridDemo}/>
                  <Route path='/main' component={MainPage}/>
                  <Redirect to='main'/>
              </Switch>
            </Router>
            <Notifier/>
        </ThemeProvider>
      </RTL>  
    </Provider>
  );
}

export default App;
