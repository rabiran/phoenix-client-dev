import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import PropTypes from 'prop-types'

const styles = makeStyles({
  root: {
    overflowX: 'hidden',
    minHeight: 500,
    padding: 5
  },
  label: {},
  avatar: {},
});

const PersonGrid = props => {
  const {
    personIds
  } = props;

  const classes = styles(props);

  return (
    <div className={classes.root}>
      <Grid spacing={1} container>
      {personIds.map(id => (
        <Grid key={id} item>
          <PersonItem 
            classes={{
              label: classes.label,
              avatar: classes.avatar,
            }}
            personId={id}
          />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

PersonGrid.propTypes = {
  personIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PersonGrid;  