import React from 'react';
import LabeledValue from 'components/shared/text/LabeledValue';
import Typography from '@material-ui/core/Typography';
import PersonDetails from './PersonDetails';
import { makeStyles } from '@material-ui/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const labelStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(1)
  },
  label: ({ shortLabel }) => ({
    flexGrow: 1,
    maxWidth: shortLabel ? '80px': '110px',
    minWidth: '75px',
    fontWeight: 'bold',
  }),
  value: {
    // fontWeight: 'bold',
  }
}));

const detailStyles = makeStyles(theme => ({
  root: {
    background: 'rgb(199, 216, 216)',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  }
}))

const detailLabelStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1)
  }
}))

const styles = makeStyles(theme => ({
  root: {
    backgroundColor: '#eceff1'
  },
  name: {
    paddingBottom: theme.spacing(1),
  }
}));


const PersonProfileDialog = ({ 
  open, 
  onClose,
  person = {}
}) => {
  const labelClasses = labelStyles();
  const detailClasses = detailStyles();
  const detailLabelClasses = detailLabelStyles();
  const classes = styles();

  const {
    fullName,
    hierarchy,
    job,
    ...details
  } = person;
  return (
    <Dialog
      classes={{
        paper: classes.root
      }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='md'
    >
      <DialogTitle>פרטים אישיים</DialogTitle>
      <DialogContent>
        <Typography 
          className={classes.name}
          variant='h5' 
          component='div'
        >
          {fullName}
        </Typography>
        <LabeledValue
          classes={{...labelClasses}}
          label='היררכיה:'
          value={hierarchy?.join('/')}
        />
        <LabeledValue
          classes={{...labelClasses}}
          label='תפקיד:'
          value={job}
        />
      </DialogContent>
        <div className={detailClasses.root}>
          <PersonDetails 
            {...details} 
            labeledValueClasses={detailLabelClasses}
          />
        </div>
    </Dialog>
  );
}

export default PersonProfileDialog;
