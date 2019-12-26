import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function HierarchySuggest(props) {
    const [value, setValue] = React.useState('google');

    const handleChange = event => {
        console.log(event.target.value);
        setValue(event.target.value);
    };

    let arr = [];
    let fields = [];
    if (props.hierarchy) {
        arr = props.hierarchy.split('/');
        // arr.map((e, index) => fields.push(
        //     <Radio key={index} value={e} />
        // ))
    }

    return (
        // <>
        //     <p>suggested groups:</p>
        //     <div>{fields}</div>
        // </>
        <FormControl component="fieldset">
            <FormLabel component="legend">Suggested groups:</FormLabel>
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange}>
                {arr.map((e, index) => 
                    <FormControlLabel
                        value={props.hierarchy.split('/',index+1).toString().replace(',','/')}
                        control={<Radio color="primary" />}
                        label={props.hierarchy.split('/',index+1).toString().replace(',','/')}
                        labelPlacement="end"
                        key={index}
                    />
                )}

                {/* <FormControlLabel
                    value="start"
                    control={<Radio color="primary" />}
                    label="Start"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="bottom"
                    control={<Radio color="primary" />}
                    label="Bottom"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="end"
                    control={<Radio color="primary" />}
                    label="End"
                    labelPlacement="end"
                /> */}
            </RadioGroup>
        </FormControl>
    );
}

