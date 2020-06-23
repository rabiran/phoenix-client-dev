import { useState, useMemo, useCallback } from "react";
import { BasicValidate } from "./personalValidation";
import _ from "lodash";
/**
 * Custom hook with logic for form
 * its includes validations, controller values, errorMessage and requireds  
 */
export const useFormHandled = () => {
  // Object with all details on each field
  const [inputs, setInputs] = useState({});
  // Indicate if all form values is valid
  const [isValidForm, setIsValidForm] = useState(true);
  // Each time the inputs changes, checks if the form is valid
  useMemo(()=>{
    for (const field of Object.values(inputs)) {
        if(field.isValid !== undefined && !field.isValid){
          return setIsValidForm(false);
        }
    }

    return setIsValidForm(true);
  }, [inputs]);

  // Return object that key is name of field and value is value of this filed
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const flatObject = {};
    for (let [key, value] of Object.entries(inputs)) {
      flatObject[key] = value.value ? value.value : "";
    }

    return flatObject;
  };

  /**
   * Checks validation of input value and responds accordingly 
   * @param {Object} event event's click
   */
  const handleInputChange = (event) => {
    if (event.persist) event.persist();
    let name = event.target.name;
    let value = event.target.value;
    // Changes the value if there are no validations
    if (!inputs[name].validations) {
      setInputs((inputs) => ({
        ...inputs,
        [name]: { ...inputs[name], value, isValid: true, errorMessage: "" },
      }));
    } else {
      // Passes all validations and if falls, changes the errorMessage and value if not 'avoidWrite'
      for (let index = 0; index < inputs[name].validations.length; index++) {
        if (!inputs[name].validations[index].func(value)) {
          let propToChange = {
            errorMessage: inputs[name].validations[index].message,
            isValid: false,
          };
          if (!inputs[name].validations[index].avoidWrite)
            propToChange = { ...propToChange, value };
          setInputs((inputs) => ({
            ...inputs,
            [name]: { ...inputs[name], ...propToChange },
          }));
          break;
        }
        // In case it passed all the validations   
        if (inputs[name].validations.length - 1 === index) {
          setInputs((inputs) => ({
            ...inputs,
            [name]: { ...inputs[name], value, isValid: true, errorMessage: "" },
          }));
        }
      }
    }
    // If required and the field is empty
    if (inputs[name].required && !BasicValidate.stringNotEmpty(value)) {
      setInputs((inputs) => ({
        ...inputs,
        [name]: {
          ...inputs[name],
          value,
          isValid: false,
          errorMessage: "שדה חובה",
        },
      }));
    }
  };

  /**
   * Initilaize inputs object. Each field should be like this:
   *  // key
   *  firstName: {
   *  // Whether this field is required (optional) default: false
   *  required: true,
   *  // value of this field (required)
   *  value: "",
   *  // Array of validations. the validition שre examined in order (optional)
   *  validations: [
   *    {
   *      // function that return true if valid
   *      func: PersonValidate.namePart,
   *      // message if func is false
   *      message: "שם מורכב מאותיות בלבד",
   *      // if change the value in case it is incorrect    
   *      avoidWrite: true,
   *    },   
   *  ],
   *  // The message according to functions (not need to initilaize this property)
   *  errorMessage: "",
   *  // if the value is error (optional) default: true
   *  isValid: true,
   *  }
   * @param {Object} initInputs 
   */
  const initializeInputs = (initInputs) => {
    setInputs(initInputs);
  };

  /**
   * If i want to replace the value or functions to fields 
   * i can to do this here. its override prevent values
   */
  const updateInputs = useCallback((updateInputs) => {
    setInputs((oldInputs) => _.merge(oldInputs, updateInputs));
  },[]);

  return {
    handleSubmit,
    handleInputChange,
    initializeInputs,
    updateInputs,
    isValidForm,
    inputs,
  };
};
