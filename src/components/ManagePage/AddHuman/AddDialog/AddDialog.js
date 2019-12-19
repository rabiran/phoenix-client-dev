import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Ctrlk from '../../../Stuff/Ctrlk';

const useStyles = makeStyles({
    dialog: {
        minHeight: '50%',
        maxHeight: '50%',
        minWidth: '400px',
        maxWidth: '25%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default function AddDialog(props) {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(true);

    function getHuman(value){
        console.log(value);
        if(value)
            setDisabled(false);
        else
            setDisabled(true);
    }

    return (
        <div >
            <Dialog classes={{ paper: classes.dialog }}
                open={props.open}
                onClose={props.dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Add human</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is a random wall of text
            </DialogContentText>

                    {/* <TextField id="standard-basic" label="Find human" /> */}
                    <Ctrlk api='https://country.register.gov.uk/records.json?page-size=5000'
                    label="Find human" getHuman={getHuman}/>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={props.dialogClose} color="primary" variant="contained">NO</Button>
                    <Button onClick={props.dialogClose} color="primary" variant="contained" disabled={disabled}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
