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
  const menuItems = [{title: 'דף הבית', url: '/'}, 
                     {title: 'עמוד ניהול', url: '/managePage'},
                     {title: 'עץ', url: '/treeDemo'}]

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

          <Typography variant="h6" className='header-title'>
            עוף החול נייטרו
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
