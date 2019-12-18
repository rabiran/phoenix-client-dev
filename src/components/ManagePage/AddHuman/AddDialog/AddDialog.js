import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dialog: {
        minHeight: '50%',
        maxHeight: '50%',
        minWidth: '25%',
        maxWidth: '25%'
    },
    actions: {
        display: 'flex',
        justifyContent: 'center'
    }
});

export default function AddDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            if (active) {
                setOptions(Object.keys(countries).map(key => countries[key].item[0]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);


    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    async function getThings(){
        setOpen(true);
        const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            setOptions(Object.keys(countries).map(key => countries[key].item[0]));
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
                    <Autocomplete
                        id="asynchronous-demo"
                        style={{ width: 300 }}
                        open={open}
                        // onOpen={() => {
                        //     setOpen(true);
                        // }}
                        // onClose={() => {
                        //     setOpen(false);
                        // }}
                        getOptionSelected={(option, value) => option.name === value.name}
                        getOptionLabel={option => option.name}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                            <TextField
                                {...params}
                                onChange={() => {
                                    getThings();
                                }}
                                label="Find human"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <Button onClick={props.dialogClose} color="primary">
                        NO
            </Button>
                    <Button onClick={props.dialogClose} color="primary" autoFocus>
                        Add
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}