import React from 'react';
import './App.css';
import Header from './components/Header';
import { theme } from './theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import RTL from './components/RTL';
// Configure JSS

function App() {
  return (
      <RTL>
        <ThemeProvider theme={theme}>
            <Header/>
        </ThemeProvider>
      </RTL>
  );
}

export default App;
