import React, { useCallback } from 'react';
import letter from "../../../assets/images/letter.png";
import { useDispatch } from "react-redux";
import styles from "./messageDialog.style";
import { resetData } from "../../../features/apiComponents/addSoldierTab/addSoldierTabSlice";
import {
  Typography, 
  Dialog,
  Link,
  DialogActions,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default ({fullName, successUpdate}) => {
  const classes = styles();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const Div = useCallback(({ children }) => (
    <div className={classes.messageContainer}>{children}</div>
  ));
  return (
    <Dialog open={successUpdate} PaperComponent={Div}>
        <div className={classes.DialogContainer}>
          <div className={classes.letter}>
            <img src={letter} />
          </div>
          <div className={classes.dialogTitle}>
            <Typography
              align="center"
              classes={{ h3: classes.typographyFontWeight }}
              variant="h3"
            >
              יש!
            </Typography>
          </div>
          <div>
            <hr className={classes.divider} />
          </div>
          <div>
            <Typography
              align="center"
              variant="h5"
              classes={{ h5: classes.typographyFontWeight }}
            >{`שינוי פרטי החייל ${fullName} נשמרו בהצלחה`}</Typography>
          </div>
          <DialogActions classes={{ root: classes.dialogAction }}>
            <Link
              underline="always"
              variant="body1"
              component="button"
              TypographyClasses={{
                colorPrimary: classes.linkColor,
                body1: classes.typographyFontWeight,
              }}
              onClick={() => {
                dispatch(resetData());
                history.push("/");
              }}
            >
              למסך הבית
            </Link>
            <Link
              underline="always"
              variant="body1"
              component="button"
              TypographyClasses={{
                colorPrimary: classes.linkColor,
                body1: classes.typographyFontWeight,
              }}
              onClick={() => {
                dispatch(resetData());
                history.push("/addPerson");
              }}
            >
              ערוך חייל נוסף
            </Link>
          </DialogActions>
        </div>
      </Dialog>
  );
}
