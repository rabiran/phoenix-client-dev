
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Ctrlk(props) {
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    async function getThings(e){
        let value = e.target.value;
        setOptions([]);
        if(value.length > 1){
            setOpen(true);
            const response = await fetch(props.api);
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            setOptions(Object.keys(countries).map(key => countries[key].item[0]));
        }
        else{
            setOpen(false);
        }
    }
    return (
        <Autocomplete
            // style={{ width: 300 }}
            
            open={open}
            // onOpen={() => {
            //     setOpen(true);
            // }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event,value) => props.getHuman(value)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={option => option.name}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    fullWidth
                    {...params}
                    onChange={(e) => {
                        getThings(e);
                    }}
                    label={props.label}
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
    );
}


function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}