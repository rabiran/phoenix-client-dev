import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';

//theme.palette.primary.main
const useStyles = makeStyles((theme) => ({
    focused: {
        color: theme.palette.primary.main,
    },
}));

export default function ItemMenu(props) {
    const classes = useStyles();
    const items = [];

    for(const item of props.items) {
        items.push(<MenuItem key={item.title} onClick={()=> props.onClickMethod(item.url)} >
                        <ListItemIcon className={item.current ? classes.focused : null}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title} className={item.current ? classes.focused : null}/>
                   </MenuItem>)
    }

    return (
        <Menu
            id="simple-menu"
            anchorEl={props.anchorEl}
            keepMounted
            // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            // transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(props.anchorEl)}
            onClose={props.handleClose}
        >
            {items}
        </Menu>
    );
}