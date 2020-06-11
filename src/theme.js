import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import grey from '@material-ui/core/colors/grey'

// export let isdark = false;

// export const ThemeContext = React.createContext({
//   dark: false,
//   toggle: () => {},
// });

// export const idk = () => {
//   return React.useContext(ThemeContext);
// }


// export const changeTheme = () => {
//   isdark = !isdark;
//   console.log(isdark);
// }



export const theme = responsiveFontSizes(createMuiTheme({
    direction: 'rtl',
    body: '#E2E2E2',
    text: '#363537',
    palette: {
      action: {
        selected: teal[400],
        expanded: teal[100]
      },
      background: {
        default: "#000000"
      },
      text: {
        primary: "#ffffff"
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
    background: {
      default: "#ffffff"
    },
    text: {
      primary: "#000000"
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
    background: {
      default: "#363537"
    },
    text: {
      primary: "#ffffff"
    },
    primary: grey,
    secondary: red,
    type: 'dark'
  },
}));