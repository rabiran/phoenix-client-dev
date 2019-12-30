import React from 'react';
import './App.css';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/RTL';

import Header from './components/Header';


import TreeDemo from './components/TreeList/TreeDemo';
// Configure JSS

function App() {
  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <Header />
        <TreeDemo />
      </ThemeProvider>
    </RTL>
  );
}

export default App;
