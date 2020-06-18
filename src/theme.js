
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';


export const theme = responsiveFontSizes(createMuiTheme({
    direction: 'rtl',
    palette: {
      link: {
        dialog: '#e65c00'
      },
      background: {
        default: 'white',
      },
      text: {
        primary: "#000000",
      },
      action: {
        selected: teal[400],
        expanded: teal[100]
      },
      primary: teal,
      secondary: red,
      type: 'light'
    },
}));
  