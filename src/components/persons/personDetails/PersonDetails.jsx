import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import LabeledValue from 'components/shared/text/LabeledValue';

const styles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
    width: '100%',
  },
  column: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minWidth: 200
  },
  divider: {
    borderRight: '1px dashed grey',
  }
}));


const StyledField = withStyles(theme => ({
  root: {
    display: 'flex',
  },
  label: ({ shortLabel }) => ({
    flexGrow: 1,
    maxWidth: shortLabel ? '80px': '110px',
    minWidth: '75px',
    fontWeight: 'bold',
    color: theme.palette.grey[600],
  }),
  value: {
    fontWeight: 'bold',
    maxWidth: '60%'
  }
}))(LabeledValue);

const PersonDetails = ({ 
  personalNumber, 
  identityCard,
  rank,
  clearance,
  phone,
  mobilePhone,
  mail,
  address,
  labeledValueClasses = {}
}) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <div className={classes.column}>
        <StyledField
          classes={{ ...labeledValueClasses }}
          label='מספר אישי:'
          name='personalNumber'
          value={personalNumber}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          label='תעודת זהות:'
          name='identityCard'
          value={identityCard}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          label='דרגה:'
          name='rank'
          value={rank}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          label='סיווג:'
          name='clearance'
          value={clearance}
        />
      </div>
      <div className={classes.divider}></div>
      <div className={classes.column}>
        <StyledField
          classes={{ ...labeledValueClasses }}
          shortLabel
          label='טלפון:'
          name='phone'
          value={phone}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          shortLabel
          label='נייד:'
          name='mobilePhone'
          value={mobilePhone}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          shortLabel
          label='מייל:'
          name='mail'
          value={mail}
        />
        <StyledField
          classes={{ ...labeledValueClasses }}
          shortLabel
          label='כתובת:'
          name='address'
          value={address}
        />
      </div>
    </div>
  );
}

export default PersonDetails;
