
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

/**
 * Gets api ,label and getCtrlkValue method
 * @param {string} props.api
 * @param {string} props.label
 * @param {function} props.getCtrlkValue(value)
 */
export default function Ctrlk(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    async function getThings(e){ // get typed text and search for it in api.
        let value = e.target.value;
        setOptions([]);
        if(value.length > 1){
            setOpen(true);
            //'https://country.register.gov.uk/records.json?page-size=5000'
            // console.log(props.api+value);
            const response = await axios.get(props.api+value);
            // await sleep(1e3); // remove this line on prod.
            // const countries = await response.json();
            const persons = response.data;
            // setOptions(Object.keys(countries).map(key => countries[key].item[0]));
            setOptions(persons);
        }
        else{
            setOpen(false);
        }
    }
    return (
        <Autocomplete
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event,value) => props.getCtrlkValue(value)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={option => option.fullName}
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


// function sleep(delay = 0) {
//     return new Promise(resolve => {
//         setTimeout(resolve, delay);
//     });
// }