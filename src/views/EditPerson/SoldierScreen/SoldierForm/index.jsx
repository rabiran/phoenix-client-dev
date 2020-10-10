import React, { useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import letter from "../../../../assets/images/letter.png";
import PersonalInfo from "../../PersonalInfo";
import TeamAndJob from "../../TeamAndJob";
import styles from "./soldierForm.style";
import StyledButton from "../../../../components/shared/styleComponent/StyleButton";
import { useFormHandled } from "../../../../helper/useFormHandled";
import { PersonValidate } from "../../../../helper/personalValidation";
import {
  updateSoldierRequest,
  resetData,
  getLoadings,
  selectErrors,
  getOpenDialog,
} from "../../../../features/apiComponents/editSoldierTab/editSoldierTabSlice";
import MessageDialog from "../../../../components/shared/dialog/messageDialog";
import { useHistory } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useCallback } from "react";
import PropTypes from "prop-types";

/**
 * form to soldier
 */
export default function SoldierForm({ soldier, disabled }) {
  // Right now some field in form not relevant,  So I filter the filed to update (and directgroup)
  const fieldToUpdate = [
    "firstName",
    "lastName",
    "rank",
    "job",
    "mail",
    "phone",
    "mobilePhone",
    "address",
  ];

  // Props from redux
  const { updateInProgress, openDialog, updateSoldierError } = useSelector(
    (state) => {
      const openDialog = getOpenDialog(state);
      return {
        ...getLoadings(state),
        ...selectErrors(state),
        openDialog,
      };
    }
  );
  // jss styles
  const classes = styles();
  // Access to URL
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    inputs,
    isValidForm,
    handleInputChange,
    handleSubmit,
    initializeInputs,
    updateInputs,
  } = useFormHandled();
  // handled action in dialog
  const mainPage = useCallback(
    (e) => {
      dispatch(resetData());
      history.push("/");
    },
    [dispatch, history]
  );
  const EditAnotherSoldier = useCallback(
    (e) => {
      dispatch(resetData());
      history.push("/editPerson");
    },
    [dispatch, history]
  );
  // In first time that component render intilize validition and other property for each field in form
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
            avoidWrite: true,
          },
          {
            func: PersonValidate.leastTwoLetters,
            message: "שם מורכב מלפחות 2 אותיות",
            avoidWrite: false,
          },
        ],
        isValid: true,
      },
      lastName: {
        required: true,
        value: "",
        errorMessage: "",
        validations: [
          {
            func: PersonValidate.namePart,
            message: "שם מורכב מאותיות בלבד",
            avoidWrite: true,
          },
          {
            func: PersonValidate.leastTwoLetters,
            message: "שם מורכב מלפחות 2 אותיות",
            avoidWrite: false,
          },
        ],
        isValid: true,
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
            avoidWrite: true,
          },
          {
            func: PersonValidate.minFiveDigit,
            message: "מס' ת.ז צריך להיות בין חמש לתשע ספרות",
            avoidWrite: false,
          },
          {
            func: PersonValidate.identityCard,
            message: "מס' הת.ז אינו תקין",
            avoidWrite: false,
          },
        ],
      },
      rank: {
        required: true,
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.rank,
            message: "יש למלא דרגה תקינה",
          },
        ],
      },
      directGroup: {
        value: "",
      },
      phone: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.phone,
            message: "מס' טלפון לא חוקי",
          },
        ],
      },
      mobilePhone: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.mobilePhone,
            message: "מס' נייד לא חוקי",
          },
        ],
      },
      mail: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.email,
            message: 'כתובת דוא"ל לא חוקית',
          },
        ],
      },
      address: {
        value: "",
      },
      city: {
        value: "",
      },
      zipCode: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.zipCode,
            message: "מיקוד צריך להכיל 7 ספרות",
          },
          {
            func: PersonValidate.maxSeven,
            message: "מיקוד צריך להכיל 7 ספרות",
            avoidWrite: true,
          },
        ],
      },
      homeNumber: {
        value: "",
        errorMessage: "",
        isValid: true,
        validations: [
          {
            func: PersonValidate.homeNumber,
            message: "",
            avoidWrite: true,
          },
        ],
      },
      withClearance: {
        value: "No classification",
      },
      job: {
        value: "",
      },
      description: {
        value: "",
      },
    });
    initialRef.current = "Done";
  }

  // Each time a soldier reloads, their data is updated
  useMemo(() => {
    updateInputs({
      firstName: {
        value: soldier.firstName || "",
        errorMessage: "",
        isValid: true,
      },
      lastName: {
        value: soldier.lastName || "",
        errorMessage: "",
        isValid: true,
      },
      identityCard: {
        value: soldier.identityCard || "",
        errorMessage: "",
        isValid: true,
      },
      personalNumber: {
        value: soldier.personalNumber || "",
      },
      clearance: {
        value: soldier.clearance || "",
      },
      rank: {
        value: soldier.rank || "",
        errorMessage: "",
        isValid: true,
      },
      phone: {
        value: soldier.phone ? soldier.phone[0] : "",
        errorMessage: "",
        isValid: true,
      },
      mobilePhone: {
        value: soldier.mobilePhone ? soldier.mobilePhone[0] : "",
        errorMessage: "",
        isValid: true,
      },
      mail: {
        value: soldier.mail || "",
        errorMessage: "",
        isValid: true,
      },
      address: {
        value: soldier.address || "",
        errorMessage: "",
        isValid: true,
      },
      withClearance: {
        value: !soldier.clearance
          ? "No classification"
          : soldier.clearance === "0"
          ? "No classification"
          : "There is a classification",
        errorMessage: "",
        isValid: true,
      },
      job: {
        value: soldier.job || "",
        errorMessage: "",
        isValid: true,
      },
      zipCode: {
        value: "",
        errorMessage: "",
        isValid: true,
      },
      city: {
        value: "",
        errorMessage: "",
        isValid: true,
      },
      description: {
        value: "",
        errorMessage: "",
        isValid: true,
      },
      homeNumber: {
        value: "",
        errorMessage: "",
        isValid: true,
      },
    });
  }, [soldier, updateInputs]);

  // Update Soldier to Kartoffel
  const updateSoldier = (e) => {
    // Get key value each field from useFormHandled
    const fullPersonChange = handleSubmit(e);
    // filter according 'fieldToUpdate'
    const updatePerson = _.pick(fullPersonChange, fieldToUpdate);
    const directGroup = fullPersonChange.directGroup
      ? fullPersonChange.directGroup
      : null;
    // Save phone changes in array
    updatePerson.mobilePhone = updatePerson.mobilePhone
      ? [updatePerson.mobilePhone].concat(soldier.mobilePhone.slice(1))
      : soldier.mobilePhone.slice(1);
    updatePerson.phone = updatePerson.phone
      ? [updatePerson.phone].concat(soldier.phone.slice(1))
      : soldier.phone.slice(1);
    // update soldier in Kartoffel
    dispatch(
      updateSoldierRequest({
        personId: soldier.id,
        personUpdate: updatePerson,
        directGroup,
      })
    );
  };

  const dialogProps = {
    title: "",
    message: "",
    actions: [
      { name: "ערוך חייל נוסף", func: EditAnotherSoldier },
      { name: "למסך הבית", func: mainPage },
    ],
  };
  if (openDialog) {
    if (!_.isEmpty(updateSoldierError)) {
      dialogProps.title = "אויש!";
      dialogProps.message = `אירעה שגיאה בשמירת פרטי החייל ${soldier.fullName}, אנא פנה למנהל המערכת`;
    } else {
      dialogProps.title = "יש!";
      dialogProps.message = `שינוי פרטי החייל ${soldier.fullName} נשמרו בהצלחה`;
    }
  }
  return (
    <>
      <MessageDialog
        topImage={letter}
        {...dialogProps}
        open={openDialog}
      />
      {/* backdrop while save changes in Kartoffel */}
      <Backdrop className={classes.backdrop} open={updateInProgress}>
        <CircularProgress color="primary" />
      </Backdrop>
      <form method={"post"}>
        {/* field that connect to personal info */}
        <PersonalInfo
          formInputs={inputs}
          onChangeHandle={handleInputChange}
          personDetails={soldier}
          disabled={disabled}
        />
        {/* field to change hirarchy of soldier */}
        <TeamAndJob
          formInputs={inputs}
          onChangeHandle={handleInputChange}
          personDetails={soldier}
          disabled={disabled}
        />
        <div className={classes.submitContainer}>
          <StyledButton
            onClick={updateSoldier}
            // can't click if soldier empty or search and if some value in fields in form not valid
            disabled={disabled || _.isEmpty(soldier) || !isValidForm}
          >
            שמור שינויים
          </StyledButton>
        </div>
      </form>
    </>
  );
}

SoldierForm.propTypes = {
  /**
   * The soldier object from kartoffel
   */
  soldier: PropTypes.object,
  /**
   * Indication to disabled input field
   */
  disabled: PropTypes.bool,
};
