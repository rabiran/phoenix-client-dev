import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Mic from '@material-ui/icons/Mic';
import Navigation from '@material-ui/icons/Navigation';
import  { useHistory } from 'react-router-dom';
import HeaderMenu from 'components/common/Header/HeaderMenu';
import useTheme from 'features/contexts/Theme/UseTheme';

const useStyles = makeStyles((theme) => ({

  Spacing: {
      marginRight: theme.spacing(2),
  },

}));

export default function Header() {
  const themeProvider = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const currentUrl = history.location.pathname;

  // const menuItems = [{title: 'דף הבית', param: '/', icon: <Home fontSize="small" />, current: currentUrl === '/', onClickMethod: (e) => redirect(e)}, 
  //                    {title: 'עמוד ניהול', param: '/managePage', icon: <SupervisorAccount fontSize="small" />, current: currentUrl === '/managePage', onClickMethod: (e) => redirect(e)},
  //                    {title: 'עץ', param: '/treeDemo', icon: <Hotel fontSize="small" />, current: currentUrl === '/treeDemo', onClickMethod: (e) => redirect(e)},
  //                    {title: 'החלף רקע', param: '', icon: <Brightness3 fontSize="small" />, current: false, onClickMethod: (e) => changeTheme(e)}]

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
  
  const changeTheme = () => {
    handleClose();
    themeProvider.themeSwitch();
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
          {/* <ItemMenu items={menuItems} handleClose={handleClose} anchorEl={anchorEl} onClickMethod={redirect}/> */}
              <HeaderMenu handleClose={handleClose} anchorEl={anchorEl} redirect={redirect} changeTheme={changeTheme} currentUrl={currentUrl}/>
          <Typography variant="h6" className='header-title' >
            עוף החול נייטרו
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
