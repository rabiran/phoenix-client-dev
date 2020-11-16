import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/common/RTL';
import ManagePage from './views/ManagePage/ManagePage';
import EditPerson from "./views/EditPerson";
import TreeDemo from './views/TreeListDemo/TreeDemo';
import Header from './components/common/Header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import GridDemo from './views/GridDemo/GridDemo';
import MainPage from './views/MainPage/MainPage';
import Notifier from 'components/common/Notifier';
import ProtectedRoute from 'components/auth/ProtectedRoute';
import LoginView from 'views/LoginView';

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider theme={theme}>
            <Router>
            <Header/>
              <Switch>
                  <Route path='/treeDemo' component={TreeDemo}/>
                  {/* <Route exact path='/' component={LandingPage} /> */}
                  <ProtectedRoute path='/managepage'>
                    <ManagePage/>
                  </ProtectedRoute>
                  <ProtectedRoute path='/treeDemo'>
                    <TreeDemo/>
                  </ProtectedRoute>
                  <ProtectedRoute path='/grid'>
                    <GridDemo/>
                  </ProtectedRoute>
                  <ProtectedRoute exact path='/main'>
                    <MainPage/>
                  </ProtectedRoute>
                  <ProtectedRoute path='/EditPerson/:personalNumber?'>
                    <EditPerson/>
                  </ProtectedRoute>
                  <Route path='/login' component={LoginView}/>
                  <Redirect to='/main'/>
              </Switch>
            </Router>
            <Notifier/>
        </ThemeProvider>
      </RTL>  
    </Provider>
  );
}

export default App;
