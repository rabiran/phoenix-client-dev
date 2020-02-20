import React, { useState } from "react";
import { BasicValidate } from "./personalValidation";
import _ from 'lodash';

export const useFormHandled = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = event => {
    event.persist();
    let name = event.target.name;
    let value = event.target.value;
    if (!inputs[name].validations) {
      setInputs(inputs => ({ ...inputs, [name]: { ...inputs[name], value, isValid: true,  errorMessage: ''}}));
    } else {
      for (let index = 0; index < inputs[name].validations.length; index++) {
        if (!inputs[name].validations[index].func(value)) {
          let propToChange = {errorMessage: inputs[name].validations[index].message , isValid: false};
          if (!inputs[name].validations[index].avoidWrite) propToChange = {...propToChange, value}; 
          setInputs(inputs => ({ ...inputs, [name]: { ...inputs[name], ...propToChange } }));
          break;
        }
        if(inputs[name].validations.length-1 === index) {
          setInputs(inputs => ({ ...inputs, [name]: { ...inputs[name], value, isValid: true , errorMessage: ''}}));
        }
      }
    }
    if (inputs[name].required && !BasicValidate.stringNotEmpty(value)) {
      setInputs(inputs => ({ ...inputs, [name]: { ...inputs[name], value, isValid: false,  errorMessage: 'שדה חובה'} }));
    }
  };

  const initializeInputs = initInputs => {
    setInputs(initInputs);
  };

  const updateInputs = updateInputs => {
    setInputs(oldInputs => (_.merge(oldInputs, updateInputs)));
  };

  return {
    handleSubmit,
    handleInputChange,
    initializeInputs,
    updateInputs,
    inputs
  };
};
