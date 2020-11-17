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
import AuthenticatedRoute from 'components/auth/AuthenticatedRoute';
import EditorPrivillagedRoute from 'components/auth/EditorPrivillagedRoute';
import LoginView from 'views/LoginView';
import Kermit from 'views/UnauthorizedKermit';


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
                  <AuthenticatedRoute path='/managepage'>
                    <ManagePage/>
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path='/treeDemo'>
                    <TreeDemo/>
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path='/grid'>
                    <GridDemo/>
                  </AuthenticatedRoute>
                  <AuthenticatedRoute exact path='/main'>
                    <MainPage/>
                  </AuthenticatedRoute>
                  <AuthenticatedRoute path='/EditPerson/:personalNumber?'>
                    <EditorPrivillagedRoute>
                      <EditPerson/>
                    </EditorPrivillagedRoute>
                  </AuthenticatedRoute>
                  <Route path='/login' component={LoginView}/>
                  <Route path='/kermit' component={Kermit}/>
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
