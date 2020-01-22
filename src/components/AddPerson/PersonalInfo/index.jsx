import React from "react";
import clsx from "clsx";
import styles from "./PersonalInfo.style";
import {
  TextField,
  InputAdornment,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Divider
} from "@material-ui/core";

export default props => {
  const classes = styles();
  return (
    <div className={clsx(classes.prsnlinfContainer)}>
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">שם פרטי:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">שם משפחה:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">תעודת זהות:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">דרגה:</InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.divider}/>      
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">טלפון:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">נייד:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">דוא"ל:</InputAdornment>
            )
          }}
        />
      </div>
      <div className={classes.divider}/>
      <div className={clsx(classes.prsnlinfSubContainer)}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">כתובת:</InputAdornment>
            )
          }}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">ישוב:</InputAdornment>
            )
          }}
        />
        <div className={classes.prsnlinfAddressContainer}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">מיקוד:</InputAdornment>
              )
            }}
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">מס' בית:</InputAdornment>
              )
            }}
          />
        </div>
      </div>
      <div className={classes.divider}/>
      <div className={clsx(classes.prsnlinfSubContainer, classes.prsnlinfsabatContainer)}>
        <FormControl>
          <FormLabel>סיווג ביטחוני (למילוי ע"י הקב"ט בלבד):</FormLabel>
          <RadioGroup value="No classification">
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
