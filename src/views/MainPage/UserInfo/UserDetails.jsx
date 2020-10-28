import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import LabeledValue from 'components/shared/text/LabeledValue';

const styles = makeStyles(theme => ({
  root: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    // flexGrow: '1',
  },
  column: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  divider: {
    borderRight: '1px dashed grey',
    height: '100%',
    margin: 'auto 0',
  }
}));


const StyledField = withStyles(theme => ({
  root: {
    display: 'flex',
  },
  label: ({ shortLabel }) => ({
    flexGrow: 1,
    maxWidth: shortLabel ? '90px': '110px',
    minWidth: '75px',
    fontWeight: 'bold',
    color: theme.palette.grey[600],
  }),
  value: {
    fontWeight: 'bold',
    maxWidth: '60%'
  }
}))(LabeledValue);

const UserDetails = ({ 
  personalNumber, 
  identityCard,
  rank,
  clearance,
  phone,
  mobilePhone,
  mail,
  address,
}) => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.column}>
          <StyledField
            label='מספר אישי:'
            name='personalNumber'
            value={personalNumber}
          />
          <StyledField
            label='תעודת זהות:'
            name='identityCard'
            value={identityCard}
          />
          <StyledField
            label='דרגה:'
            name='rank'
            value={rank}
          />
          <StyledField
            label='סיווג:'
            name='clearance'
            value={clearance}
          />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.column}>
          <StyledField
            shortLabel
            label='טלפון:'
            name='phone'
            value={phone}
          />
          <StyledField
            shortLabel
            label='נייד:'
            name='mobilePhone'
            value={mobilePhone}
          />
          <StyledField
            shortLabel
            label='מייל:'
            name='mail'
            value={mail}
          />
          <StyledField
            shortLabel
            label='כתובת:'
            name='address'
            value={address}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
