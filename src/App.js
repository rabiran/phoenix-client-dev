import React from 'react';
import { Provider } from 'react-redux';
import store from './features/store';
import './App.css';
import ThemeSwitch from 'features/contexts/ThemeSwitch';
import RTL from './components/common/RTL';
import ManagePage from './views/ManagePage/ManagePage';
import LandingPage from './views/LandingPage/LandingPage';
import TreeDemo from './views/TreeListDemo/TreeDemo';
import Header from './components/common/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <RTL>
        <ThemeSwitch>
              <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/managepage' component={ManagePage} />
                    <Route path='/treeDemo' component={TreeDemo}/>
                </Switch>
              </Router>
        </ThemeSwitch>
      </RTL>  
    </Provider>
  );
}

export default App;
