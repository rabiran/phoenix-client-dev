
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';

export const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
      primary: teal,
      secondary: red, // Indigo is probably a good match with pink
      type: 'light'
    },
});
  