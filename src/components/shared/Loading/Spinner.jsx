import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

const Spinner = withStyles({
  root: {
    marginTop: '2px',
  }
})(CircularProgress);
Spinner.muiName = CircularProgress.muiName;
export default Spinner;