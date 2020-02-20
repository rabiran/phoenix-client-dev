import React, {useRef} from "react";
import clsx from "clsx";
import {
  TextField,
  InputAdornment,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";

export default ({
    inputs, 
    register,
    required, 
    onChange, 
    name, 
    error, 
    value, 
    helperText, 
    validations, 
    ...props
}) => {
    const initialRef = useRef(null);
    if (initialRef.current === null) {
        register({[name]: {
            required: required,
            value: value || "",
            errorMessage: "",
            validations: validations,
            isValid: true
        }});
        initialRef.current = "Done";
    }




    return <TextField
    onChange
    name
    error
    value
    helperText
    {...props}
  />
}