import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddDialog from './AddDialog/AddDialog';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    add:{
        position: 'absolute',
        bottom: '0',
        left: '0',
        padding: '20px'
    }
});

export default function Add(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const dialogClick = () => {
       setOpen(true);
    }; 

    const dialogClose = () => {
        setOpen(false);
    };

    const dialogDone = (person) => {
        props.onNewPerson(person);
        setOpen(false);
    };

    return (
        <div className={classes.add}>
            <Fab color="primary" aria-label="add" onClick={dialogClick}>
                <AddIcon/>
            </Fab>
            <AddDialog open={open} dialogClose={dialogClose} dialogDone={dialogDone}/>
        </div>
    );
}