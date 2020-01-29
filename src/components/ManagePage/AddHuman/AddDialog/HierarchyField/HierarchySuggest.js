import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

/**
 * Gets hierarchy value, onRadio method, renders hierarchy suggestions radio buttons in dialog.
 * @param {string} props.hierarchy
 * @param {function} props.onRadio(value)
 */
export default function HierarchySuggest(props) {
    const [value, setValue] = React.useState('a');

    const handleChange = event => {
        props.onRadio(event.target.value);
        setValue(event.target.value);
    };

    let arr = [];
    if (props.hierarchy) {
        arr = props.hierarchy.split('/');
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">קבוצות מומלצות ל{props.name}:</FormLabel>
            <RadioGroup aria-label="position" name="position" value={value} onChange={handleChange}>
                {arr.map((e, index) => 
                    <FormControlLabel
                        value={props.hierarchy.split('/',index+1).toString().replace(/,/g,'/')}
                        control={<Radio color="primary" size="small"/>}
                        label={props.hierarchy.split('/',index+1).toString().replace(/,/g,'/')}
                        labelPlacement="end"
                        key={index}
                    />
                )}
            </RadioGroup>
        </FormControl>
    );
}

