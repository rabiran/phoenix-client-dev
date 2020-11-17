import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';


const EDIT_PRIMARY_TEXT='עריכת פרטי חייל';
const EDIT_SECONDARY_TEXT='למורשים בלבד';



const NavDrawer = ({
  open,
  onClose,
  disableEditButton
}) => {
  return (
    <Drawer 
      open={open}
      onClose={onClose}
      anchor='left'
    >
      <div 
        onClick={onClose}
        style={{
          width: 250
        }}
      >
        <List>
          <ListItem
            disabled={disableEditButton}
            button 
            component={Link}
            to='/editPerson'
          >
            <ListItemIcon><EditIcon/></ListItemIcon>
            <ListItemText primary={EDIT_PRIMARY_TEXT} secondary={EDIT_SECONDARY_TEXT}/>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default NavDrawer;
