import React from "react";
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
  FormLabel
} from "@material-ui/core";

export default ({ formInputs, onChangeHandle, personDetails }) => {
  const classes = styles();
  let disabled = _.isEmpty(personDetails);
  return (
    <div className={clsx(classes.prsnlinfContainer)}>
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          classes={{ root: classes.rootFormControl }}
          onChange={onChangeHandle}
          name="firstName"
          error={!formInputs.firstName.isValid}
          value={formInputs.firstName.value}
          disabled={disabled}
          helperText={
            !formInputs.firstName.isValid
              ? formInputs.firstName.errorMessage
              : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">שם פרטי:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="lastName"
          error={!formInputs.lastName.isValid}
          value={formInputs.lastName.value}
          helperText={
            !formInputs.lastName.isValid ? formInputs.lastName.errorMessage : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">שם משפחה:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="identityCard"
          error={!formInputs.identityCard.isValid}
          value={formInputs.identityCard.value}
          helperText={
            !formInputs.identityCard.isValid
              ? formInputs.identityCard.errorMessage
              : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תעודת זהות:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="rank"
          error={!formInputs.rank.isValid}
          value={formInputs.rank.value}
          helperText={
            !formInputs.rank.isValid ? formInputs.rank.errorMessage : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">דרגה:</InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.divider} />
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          classes={{ root: classes.rootFormControl }}
          size="small"
          margin="dense"
          disabled={disabled}
          onChange={onChangeHandle}
          name="phone"
          error={!formInputs.phone.isValid}
          value={formInputs.phone.value}
          helperText={
            !formInputs.phone.isValid ? formInputs.phone.errorMessage : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">טלפון:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="mobilePhone"
          error={!formInputs.mobilePhone.isValid}
          value={formInputs.mobilePhone.value}
          helperText={
            !formInputs.mobilePhone.isValid
              ? formInputs.mobilePhone.errorMessage
              : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">נייד:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="email"
          error={!formInputs.email.isValid}
          value={formInputs.email.value}
          helperText={
            !formInputs.email.isValid ? formInputs.email.errorMessage : ""
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">דוא"ל:</InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.divider} />
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="address"
          value={formInputs.address.value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">כתובת:</InputAdornment>
            )
          }}
        />
        <TextField
          classes={{ root: classes.rootFormControl }}
          disabled={disabled}
          onChange={onChangeHandle}
          name="city"
          value={formInputs.city.value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">ישוב:</InputAdornment>
            )
          }}
        />
        <div className={classes.prsnlinfAddressContainer}>
          <TextField
            classes={{ root: classes.rootFormControl }}
            disabled={disabled}
            onChange={onChangeHandle}
            name="zipCode"
            value={formInputs.zipCode.value}
            error={!formInputs.zipCode.isValid}
            helperText={
              !formInputs.zipCode.isValid ? formInputs.zipCode.errorMessage : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">מיקוד:</InputAdornment>
              )
            }}
          />
          <TextField
            classes={{ root: classes.rootFormControl }}
            disabled={disabled}
            onChange={onChangeHandle}
            name="homeNumber"
            value={formInputs.homeNumber.value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">מס' בית:</InputAdornment>
              )
            }}
          />
        </div>
      </div>
      <div className={classes.divider} />
      <div
        className={clsx(
          classes.prsnlinfSubContainer,
          classes.prsnlinfsabatContainer
        )}
      >
        <FormControl disabled={disabled}>
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
