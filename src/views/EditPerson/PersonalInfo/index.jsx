import React, { useCallback } from "react";
import _ from "lodash";
import clsx from "clsx";
import styles from "./personalInfo.style";
import {
  TextField,
  InputAdornment,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * Show and change field of personal information
 */
export default function PersonalInfo({
  formInputs,
  onChangeHandle,
  personDetails,
  disabled,
  readOnly,
  mainPage,
}) {
  // jss styles
  const classes = styles({ readOnly, mainPage });  
  /**
   * Wrapped textfield component
   * @param {string} displayName represent field name in form
   * @param {string} name attribute name
   * @param {Object} fieldParams the info for field: value, isValid, errorMessage
   * @param {Object} adormentRootClass the class for adormentRootClass
   * @param {boolean} alwaysDisabled indication to disabled input field
   */
  const WrappedTextField = useCallback(
    ({ displayName, name, fieldParams, adormentRootClass, alwaysDisabled }) => {
      let notExistPerson = _.isEmpty(personDetails);
      let { value, isValid, errorMessage } = fieldParams;
      if (readOnly || mainPage) {
        return (
          <TextField
            classes={{ root: classes.rootFormControl }}
            name={name}
            value={value ? value : notExistPerson ? "" : "לא קיים במערכת"}
            disabled
            InputProps={{
              classes: { input: classes.input, disabled: classes.disabled},
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start" children={`${displayName}:`} classes= {{root: adormentRootClass}} />
              ),
            }}
          />
        );
      }
      return (
        <TextField
          classes={{ root: classes.rootFormControl }}
          onChange={onChangeHandle}
          name={name}
          error={!isValid}
          value={value}
          disabled={disabled || alwaysDisabled || notExistPerson}
          helperText={!isValid ? errorMessage : ""}
          InputProps={{
            classes: { input: classes.input, disabled: classes.disabled },
            startAdornment: (
              <InputAdornment position="start" children={`${displayName}:`} classes= {{root: adormentRootClass}}/>
            ),
          }}
        />
      );
    },
    // disabled eslint because in this useCallback if i insert to dependency array 'onChangeHandle' function, 
    // the function rerender all the times and its not need to happen
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [personDetails, classes, readOnly, disabled, mainPage]
  );
  WrappedTextField.muiName = TextField.muiName;

  // In case mainPage the fields differents
  if (mainPage) {
    let address = [formInputs.address.value, formInputs.homeNumber.value, formInputs.city.value].filter(value => value).join(', ');
    return (
      <div className={classes.prsnlinfContainer}>
        <div className={classes.prsnlinfSubContainer}>
          <WrappedTextField
            name="personalNumber"
            displayName="מס' אישי"
            fieldParams={formInputs.personalNumber}
            adormentRootClass={classes.adormentRootFirstColumn}
          />
          <WrappedTextField
            name="identityCard"
            displayName="תעודת זהות"
            fieldParams={formInputs.identityCard}
            adormentRootClass={classes.adormentRootFirstColumn}
          />
          <WrappedTextField
            name="rank"
            displayName="דרגה"
            fieldParams={formInputs.rank}
            adormentRootClass={classes.adormentRootFirstColumn}
          />
          <WrappedTextField
            name="clearance"
            displayName="סיווג"
            fieldParams={formInputs.clearance}
            adormentRootClass={classes.adormentRootFirstColumn}
          />          
        </div>
        <div className={classes.divider} />
        <div className={classes.prsnlinfSubContainer}>
          <WrappedTextField
            name="phone"
            displayName="טלפון"
            fieldParams={formInputs.phone}
            adormentRootClass={classes.adormentRootThirdColumn}
          />
          <WrappedTextField
            name="mobilePhone"
            displayName="נייד"
            fieldParams={formInputs.mobilePhone}
            adormentRootClass={classes.adormentRootThirdColumn}
          />
          <WrappedTextField
            name="mail"
            displayName='דוא"ל'
            fieldParams={formInputs.mail}
            adormentRootClass={classes.adormentRootThirdColumn}
          />     
          <TextField
            classes={{ root: classes.rootFormControl }}
            name='address'
            value={address}
            disabled
            InputProps={{
              classes: { input: classes.input, disabled: classes.disabled },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start" children='כתובת:' classes={{root: classes.adormentRootThirdColumn}}/>
              ),
            }}
          />     
        </div>
      </div>
    );
  }

  return (
    <div className={classes.prsnlinfContainer}>
      <div className={classes.prsnlinfSubContainer}>
        <WrappedTextField
          name="firstName"
          displayName="שם פרטי"
          fieldParams={formInputs.firstName}
          adormentRootClass={classes.adormentRootFirstColumn}
        />
        <WrappedTextField
          name="lastName"
          displayName="שם משפחה"
          fieldParams={formInputs.lastName}
          adormentRootClass={classes.adormentRootFirstColumn}
        />
        <WrappedTextField
          name="identityCard"
          displayName="תעודת זהות"
          fieldParams={formInputs.identityCard}
          alwaysDisabled
          adormentRootClass={classes.adormentRootFirstColumn}
        />
        <WrappedTextField
          name="rank"
          displayName="דרגה"
          fieldParams={formInputs.rank}
          adormentRootClass={classes.adormentRootFirstColumn}
        />
      </div>
      <div className={classes.divider} />
      <div className={classes.prsnlinfSubContainer}>
        <WrappedTextField
          name="phone"
          displayName="טלפון"
          fieldParams={formInputs.phone}
          adormentRootClass={classes.adormentRootSecondColumn}
        />
        <WrappedTextField
          name="mobilePhone"
          displayName="נייד"
          fieldParams={formInputs.mobilePhone}
          adormentRootClass={classes.adormentRootSecondColumn}
        />
        <WrappedTextField
          name="mail"
          displayName='דוא"ל'
          fieldParams={formInputs.mail}
          adormentRootClass={classes.adormentRootSecondColumn}
        />
      </div>
      <div className={clsx(classes.divider, classes.hiddenDivider)} />
      <div className={classes.prsnlinfSubContainer}>
        <WrappedTextField
          name="address"
          displayName="כתובת"
          fieldParams={formInputs.address}
          adormentRootClass={classes.adormentRootThirdColumn}
        />
        <WrappedTextField
          name="city"
          displayName="ישוב"
          fieldParams={formInputs.city}
          adormentRootClass={classes.adormentRootThirdColumn}
        />
        <div className={classes.prsnlinfAddressContainer}>
          <WrappedTextField
            name="zipCode"
            displayName="מיקוד"
            fieldParams={formInputs.zipCode}
            adormentRootClass={classes.adormentRootThirdColumn}
          />
          <WrappedTextField
            name="homeNumber"
            displayName="מס' בית"
            fieldParams={formInputs.homeNumber}
            adormentRootClass={classes.adormentRootThirdColumn}
          />
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.prsnlinfSubContainer}>
        <FormControl disabled={disabled || _.isEmpty(personDetails) || readOnly}>
          <FormLabel>סיווג ביטחוני (למילוי ע"י הקב"ט בלבד):</FormLabel>
          <RadioGroup
            name="withClearance"
            value={formInputs.withClearance.value}
            onChange={onChangeHandle}
          >
            <FormControlLabel
              value="There is a classification"
              control={<Radio size="small" color="default" />}
              label="עבר סיווג בטחוני"
            />
            <FormControlLabel
              value="No classification"
              control={<Radio size="small" color="default" />}
              label="ללא סיווג"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

PersonalInfo.propTypes = {
  /**
   * formInput is information about all fields: value, errorMessage, valid, etc.
   */
  formInputs: PropTypes.object.isRequired,
  /**
   * function that check input value 
   */
  onChangeHandle: PropTypes.func,
  /**
   * peresonObject
   */
  personDetails: PropTypes.object,
  /**
   *  Indication to disabled input field
   */
  disabled: PropTypes.bool,
  /**
   *  Indication to dispaly only show fields
   */
  readOnly: PropTypes.bool,
  /**
   *  Indication to match component to mainPage
   */
  mainPage: PropTypes.bool,  
};
