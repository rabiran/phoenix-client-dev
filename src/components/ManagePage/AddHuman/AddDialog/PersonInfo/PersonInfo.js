import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../../../theme.js';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles({
  info: {
    backgroundColor: fade(theme.palette.primary.main, 0.2),
    marginTop: '20px',
  },
  txt:{
    margin: '10px',
  }
});

/**
 * Gets person, and renders his values with the keys
 * @param {object} props.person
 */
export default function PersonInfo(props) {
  const classes = useStyles();

  let values = [];
  Object.entries(props.person).forEach((entry) => {
    values.push(<div key={entry[0]} className={classes.txt}>{`${entry[0]}: ${entry[1]}`}</div>);
  });

  return (
    <div className={classes.info}>
      {values}
    </div>
  );
}

