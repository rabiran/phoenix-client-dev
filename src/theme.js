
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';


export const theme = responsiveFontSizes(createMuiTheme({
    direction: 'rtl',
    palette: {
      action: {
        selected: teal[400],
        expanded: teal[100]
      },
      primary: teal,
      secondary: red,
      type: 'light'
    },
}));
  

export const lightTheme = responsiveFontSizes(createMuiTheme({
  direction: 'rtl',
  body: '#E2E2E2',
  text: '#363537',
  palette: {
    action: {
      selected: teal[400],
      expanded: teal[100]
    },
    primary: teal,
    secondary: red,
    type: 'light'
  },
}));

export const darkTheme = responsiveFontSizes(createMuiTheme({
  direction: 'rtl',
  body: '#363537',
  text: '#FAFAFA',
  palette: {
    action: {
      selected: teal[400],
      expanded: teal[100]
    },
    primary: teal,
    secondary: red,
    type: 'dark'
  },
}));