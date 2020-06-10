import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Mic from '@material-ui/icons/Mic';
import Navigation from '@material-ui/icons/Navigation';
import Home from '@material-ui/icons/Home';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Hotel from '@material-ui/icons/Hotel';
import Brightness3 from '@material-ui/icons/Brightness3';
import  { useHistory } from 'react-router-dom';
import ItemMenu from 'components/shared/menu/ItemMenu';

const useStyles = makeStyles((theme) => ({

  Spacing: {
      marginRight: theme.spacing(2),
  },

}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUrl = history.location.pathname;
  
  const menuItems = [{title: 'דף הבית', url: '/', icon: <Home fontSize="small" />, current: currentUrl === '/'}, 
                     {title: 'עמוד ניהול', url: '/managePage', icon: <SupervisorAccount fontSize="small" />, current: currentUrl === '/managePage'},
                     {title: 'עץ', url: '/treeDemo', icon: <Hotel fontSize="small" />, current: currentUrl === '/treeDemo'},
                     {title: 'החלף רקע', url: '/treeDemo', icon: <Brightness3 fontSize="small" />, current: false}]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirect = (url) => {
    history.push(url);
    handleClose();
  }

  return (
    <div className='header-root'>
      <AppBar position="static">
        <Toolbar >
          <Mic className={classes.Spacing}/>
          <Navigation className={classes.Spacing}/>
          <IconButton className={classes.Spacing} edge="end" color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <ItemMenu items={menuItems} handleClose={handleClose} anchorEl={anchorEl} onClickMethod={redirect}/>

          <Typography variant="h6" className='header-title' >
            עוף החול נייטרו
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
