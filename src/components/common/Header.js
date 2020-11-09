import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';


const styles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}))

export default function Header() {
  const classes = styles();
  return (
    <div className='header-root'>
      <AppBar position="relative">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" color="inherit">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className='header-title'>
            עוף החול נייטרו
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
