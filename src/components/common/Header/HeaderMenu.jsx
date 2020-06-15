import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Hotel from '@material-ui/icons/Hotel';
import Brightness3 from '@material-ui/icons/Brightness3';

const useStyles = makeStyles((theme) => ({
    focused: {
        color: theme.palette.primary.main,
    },
}));

/**
 * 
 * @param handleClose close menu method 
 * @param anchorEl  opens menu and sets position for menu
 * @param redirect method that redirects page
 * @param changeTheme method that changes theme
 * @param currentUrl currentUrl, used to color currentpage on menu.
 */
export default function HeaderMenu(props) {
    const classes = useStyles();

    let current = props.currentUrl

    return (
        <Menu
            id="header-menu"
            anchorEl={props.anchorEl}
            keepMounted
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
            getContentAnchorEl={null}
        >
            <MenuItem onClick={()=> props.redirect('/')} >
                <ListItemIcon className={current === '/' ? classes.focused : null}>
                    <Home />
                </ListItemIcon>
                <ListItemText primary='דף הבית' className={current === '/' ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.redirect('/managePage')} >
                <ListItemIcon className={current === '/managePage'  ? classes.focused : null}>
                    <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary='עמוד ניהול' className={current === '/managePage' ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.redirect('/treeDemo')} >
                <ListItemIcon className={current === '/treeDemo' ? classes.focused : null}>
                    <Hotel />
                </ListItemIcon>
                <ListItemText primary='עץ' className={current === '/treeDemo'  ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.changeTheme()} >
                <ListItemIcon>
                    <Brightness3 />
                </ListItemIcon>
                <ListItemText primary='החלף רקע' />
            </MenuItem>
        </Menu>
    );
}