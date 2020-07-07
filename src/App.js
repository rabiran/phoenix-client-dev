import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
import ThemeProvider from 'features/contexts/Theme/ThemeProvider';
import RTL from './components/common/RTL';
import ManagePage from './views/ManagePage/ManagePage';
import LandingPage from './views/LandingPage/LandingPage';
import TreeDemo from './views/TreeListDemo/TreeDemo';
import Header from './components/common/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeProvider>
          <Router>
            <Header/>
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/managepage' component={ManagePage} />
              <Route path='/treeDemo' component={TreeDemo}/>
            </Switch>
          </Router>
        </ThemeProvider>
      </RTL>  
    </Provider>
  );
}

export default App;
