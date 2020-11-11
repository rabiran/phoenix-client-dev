import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const styles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  }
}))

export default function Header() {
  const classes = styles();

  // menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header-root'>
      <AppBar position="relative">
        <Toolbar>
          <IconButton 
            className={classes.menuButton} 
            edge="start" 
            color="inherit"
            onClick={handleMenu}
          >
            <MenuIcon/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            // keepMounted
            open={open}
            getContentAnchorEl={null}

            onClose={handleClose}
          >
            <MenuItem 
              to='/editperson'
              onClick={handleClose}
              component={Link}
            >
              עריכת פרטים
            </MenuItem>
          </Menu>
          <IconButton
            component={Link}
            to='main'
            className={classes.menuButton} 
            edge="start" 
            color="inherit"
          >
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" className='header-title'>
            עוף החול נייטרו
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
