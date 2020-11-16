import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const Bar = withStyles({
  root:{
    width: '100%',
  }
})(LinearProgress);

Bar.muiName = LinearProgress.muiName;
export default Bar;
