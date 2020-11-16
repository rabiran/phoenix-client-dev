import React from "react";
import styles from "./messageDialog.style";
import { Typography, Dialog, Link, DialogActions } from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * Component from root element to dialog 
 */
function DialogBackground ({ children }) {
  const {messageContainer} = styles();
  
  return <div className={messageContainer}>{children}</div>
};


export default function MessageDialog({ topImage, title, message, actions, open }) {
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

MessageDialog.propTypes = {
  /**
   * image on top dialog
   */
  topImage: PropTypes.node, 
  /**
   * Dialog title 
   */
  title: PropTypes.string, 
  /**
   * Dialog message
   */
  message: PropTypes.string.isRequired, 
  /**
   * Diplay name and functions of dialog actions, function in index 0 used to 'onClosed' dialog
   */
  actions: PropTypes.arrayOf(PropTypes.exact({func: PropTypes.func.isRequired, name: PropTypes.string.isRequired})).isRequired, 
  /**
   * Indicate if open dialog
   */
  open: PropTypes.bool.isRequired,
};
