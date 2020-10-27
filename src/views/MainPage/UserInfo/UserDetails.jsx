import React from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import TextField from 'components/shared/text/LabeledValue';
import LabeledValue from 'components/shared/text/LabeledValue';
import Grid from '@material-ui/core/Grid';


const styles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  column: {
    // paddingTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: '',
    // flexBasis: '50%',
    // width: '50%',
    flexGrow: 1,
    // paddingLeft: '40px'
  },
  divider: {
    borderLeft: '1px dashed grey',
    height: '80%',
    margin: 'auto 0',
  }
});


const StyledField = withStyles(theme => ({
  root: {
    display: 'flex',
    // padding: '5px'
  },
  label: {
    // width: '100%',
    flexGrow: 1,
    maxWidth: '110px',
    minWidth: '75px',
    fontWeight: 'bold',
    color: theme.palette.grey[600],
  },
  value: {
    fontWeight: 'bold',
    maxWidth: '50%'
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
  address
}) => {
  const classes = styles();
  // return (
  //   <Grid container wrap='nowrap' justify='space-around'>
  //     <Grid item>
  //       <Grid container direction='column' justify='center'  spacing={1}>
  //         <Grid item>
  //           <StyledField
  //             label='מספר אישי:'
  //             name='personalNumber'
  //             value={personalNumber}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='תעודת זהות:'
  //             name='identityCard'
  //             value={identityCard}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='דרגה:'
  //             name='rank'
  //             value={rank}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='סיווג:'
  //             name='clearance'
  //             value={clearance}
  //           />
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //     <Grid item>
  //       <Grid container direction='column' justify='center' spacing={1}>
  //         <Grid item>
  //           <StyledField
  //             label='טלפון:'
  //             name='phone'
  //             value={phone}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='נייד:'
  //             name='mobilePhone'
  //             value={mobilePhone}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='מייל:'
  //             name='mail'
  //             value={mail}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <StyledField
  //             label='כתובת:'
  //             name='address'
  //             value={address}
  //           />
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // )


  return (
    <div className={classes.root}>
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
          label='טלפון:'
          name='phone'
          value={phone}
        />
        <StyledField
          label='נייד:'
          name='mobilePhone'
          value={mobilePhone}
        />
        <StyledField
          label='מייל:'
          name='mail'
          value={mail}
        />
        <StyledField
          label='כתובת:'
          name='address'
          value={address}
        />
      </div>
    </div>
  );
}

export default UserDetails;
