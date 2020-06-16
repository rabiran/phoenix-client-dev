import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/common/RTL';
import ManagePage from './views/ManagePage/ManagePage';
import LandingPage from './views/LandingPage/LandingPage';
import AddPerson from "./views/AddPerson";
import TreeDemo from './views/TreeListDemo/TreeDemo';
import Header from './components/common/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
                  <Route path='/addPerson/:personalNumber?' component={AddPerson} />
                  <Route path='/treeDemo' component={TreeDemo}/>
              </Switch>
            </Router>
        </ThemeProvider>
      </RTL>  
    </Provider>
  );
}

export default App;
