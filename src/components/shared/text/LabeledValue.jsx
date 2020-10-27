import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles({
  root: {},
  label: {
    display: 'inline-block'
  },
  value: {
    display: 'inline-block'
  }
});

const LabeledValue = (props) => {
  const { 
    label, 
    value 
  } = props;
  const classes = styles(props);
  return (
    <div className={classes.root}>
      <Typography
        className={classes.label}
        // component=''
        // variant='body1'
        >
          {`${label}`}
        </Typography>
      <Typography
        className={classes.value}
        // component='span'
      >
        {value}
      </Typography>
    </div>
  );
};

export default LabeledValue;