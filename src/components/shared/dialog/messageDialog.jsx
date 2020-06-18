import React from "react";
import styles from "./messageDialog.style";
import { Typography, Dialog, Link, DialogActions } from "@material-ui/core";

const DialogBackground = ({ children }) => {
  const {messageContainer} = styles();
  
  return <div className={messageContainer}>{children}</div>
};

export default ({ topImage, title, message, actions, open }) => {
  const classes = styles();

  return (
    <Dialog open={open} PaperComponent={DialogBackground} onClose={actions[0].func}>
      <div className={classes.DialogContainer}>
        <div className={classes.letter}>
          <img alt={'title'} src={topImage} />
        </div>
        <div className={classes.dialogTitle}>
          <Typography
            align="center"
            classes={{ h3: classes.typographyFontWeight }}
            variant="h3"
          >
            {title}
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
          >
            {message}
          </Typography>
        </div>
        <DialogActions classes={{ root: classes.dialogAction }}>
          {actions.map(({ name, func }) => {
            return (<Link
              key={name}
              underline="always"
              variant="body1"
              component="button"
              TypographyClasses={{
                colorPrimary: classes.linkColor,
                body1: classes.typographyFontWeight,
              }}
              onClick={func}
            >
              {name}
            </Link>)
          })}
        </DialogActions>
      </div>
    </Dialog>
  );
};
