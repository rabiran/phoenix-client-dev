import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import Home from '@material-ui/icons/Home';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Hotel from '@material-ui/icons/Hotel';
import Brightness3 from '@material-ui/icons/Brightness3';

//theme.palette.primary.main
const useStyles = makeStyles((theme) => ({
    focused: {
        color: theme.palette.primary.main,
    },
}));

export default function HeaderMenu(props) {
    const classes = useStyles();

    let current = props.currentUrl
    // const items = [];

    // for(const item of props.items) {
    //     items.push(<MenuItem key={item.title} onClick={()=> item.onClickMethod(item.param)} >
    //                     <ListItemIcon className={item.current ? classes.focused : null}>
    //                         {item.icon}
    //                     </ListItemIcon>
    //                     <ListItemText primary={item.title} className={item.current ? classes.focused : null}/>
    //                </MenuItem>)
    // }

    return (
        <Menu
            id="header-menu"
            anchorEl={props.anchorEl}
            keepMounted
            // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            // transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
        >
            {/* {items} */}
            <MenuItem onClick={()=> props.redirect('/')} >
                <ListItemIcon className={current ? classes.focused : null}>
                    <Home />
                </ListItemIcon>
                <ListItemText primary='דף הבית' className={current ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.redirect('/managePage')} >
                <ListItemIcon className={current ? classes.focused : null}>
                    <SupervisorAccount />
                </ListItemIcon>
                <ListItemText primary='עמוד ניהול' className={current ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.redirect('/treeDemo')} >
                <ListItemIcon className={current ? classes.focused : null}>
                    <Hotel />
                </ListItemIcon>
                <ListItemText primary='עץ' className={current ? classes.focused : null}/>
            </MenuItem>
            <MenuItem onClick={()=> props.changeTheme()} >
                <ListItemIcon className={current ? classes.focused : null}>
                    <Brightness3 />
                </ListItemIcon>
                <ListItemText primary='החלף רקע' className={current ? classes.focused : null}/>
            </MenuItem>
        </Menu>
    );
}