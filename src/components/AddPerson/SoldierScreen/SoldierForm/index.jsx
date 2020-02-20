import React, { useRef, useEffect, useMemo, useLayoutEffect } from "react";
import _ from 'lodash';
import PersonalInfo from "../../PersonalInfo";
import TeamAndJob from "../../TeamAndJob";
import styles from "./soldierForm.style";
import StyledButton from "../../../withStylesComponents/StyleButton";
import { useFormHandled } from "../../../../helper/customHooks";
import { PersonValidate } from "../../../../helper/personalValidation";

export default ({soldier}) => {
  const classes = styles();
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    initializeInputs,
    updateInputs,
  } = useFormHandled();
  const initialRef = useRef(null);
  if (initialRef.current === null) {
    initializeInputs({
      firstName: {
        required: true,
        value: "",
        errorMessage: "",
        validations: [
          {
            func: PersonValidate.namePart,
            message: "שם מורכב מאותיות בלבד",
            avoidWrite: true
          },
          {
            func: PersonValidate.leastTwoLetters,
            message: "שם מורכב מלפחות 2 אותיות",
            avoidWrite: false
          }
        ],
        isValid: true
      },
      lastName: {
        required: true,
        value: "",
        errorMessage: "",
        validations: [
          {
            func: PersonValidate.namePart,
            message: "שם מורכב מאותיות בלבד",
            avoidWrite: true
          },
          {
            func: PersonValidate.leastTwoLetters,
            message: "שם מורכב מלפחות 2 אותיות",
            avoidWrite: false
          }
        ],
        isValid: true
      },
      identityCard: {
        required: true,
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.maxNineDigit,
            message: "מס' ת.ז צריך להיות בין חמש לתשע ספרות",
            avoidWrite: true
          },
          {
            func: PersonValidate.minFiveDigit,
            message: "מס' ת.ז צריך להיות בין חמש לתשע ספרות",
            avoidWrite: false
          },
          {
            func: PersonValidate.identityCard,
            message: "מס' הת.ז אינו תקין",
            avoidWrite: false
          }
        ]
      },
      rank: {
        required: true,
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.rank,
            message: "יש למלא דרגה תקינה"
          }
        ]
      },
      phone: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.phone,
            message: "מס' טלפון לא חוקי"
          }
        ]       
      },
      mobilePhone: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.mobilePhone,
            message: "מס' נייד לא חוקי"
          }
        ]               
      },
      email: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.email,
            message: "כתובת דוא\"ל לא חוקית"
          }
        ]                      
      },
      address: {
        value: ""
      },
      city: {
        value: ""
      },
      zipCode: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.zipCode,
            message: "מיקוד צריך להכיל 7 ספרות"
          },
          {
            func: PersonValidate.maxSeven,
            message: "מיקוד צריך להכיל 7 ספרות",
            avoidWrite: true
          }
        ]                      
      },
      homeNumber: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [  
          {
            func: PersonValidate.homeNumber,
            message: "",
            avoidWrite: true
          }
        ]        
      },
      withClearance: {
        value: "No classification"
      },
      job: {
        value: ""
      },
      description: {
        value: ""
      }
    });
    initialRef.current = "Done";
  }

  useMemo(() => {
    updateInputs({
      firstName: {
       value: soldier.firstName || "",
      },
      lastName: {
        value: soldier.lastName || "",
      },
      identityCard: {
        value: soldier.identityCard || "",
      },
      rank: {
        value: soldier.rank || "",
      },
      phone: {
        value: soldier.phone ? soldier.phone[0] : "",
      },
      mobilePhone: {
        value: soldier.mobilePhone ? soldier.mobilePhone[0] : "",
      },
      email: {
        value: soldier.mail || "",
      },
      address: {
        value: soldier.address || "",
      },
      withClearance: {
        value: !soldier.clearance ? "No classification" : soldier.clearance == '0' ? "No classification" : 'There is a classification',
      },
      job: {
        value: soldier.job || "",
      },  
    });
  }, [soldier]);

  return (
      <form>
        <PersonalInfo formInputs={inputs} onChangeHandle={handleInputChange} personDetails={soldier}/>
        <TeamAndJob formInputs={inputs} onChangeHandle={handleInputChange} personDetails={soldier}/>
        <div className={classes.submitContainer}>
          <StyledButton disabled={_.isEmpty(soldier)}>העבר לאישור קב"ט</StyledButton>
        </div>
      </form>
  );
};
