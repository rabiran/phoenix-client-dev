import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import PropTypes from 'prop-types'

const styles = makeStyles({
  root: {},
  label: {},
  avatar: {},
});

const PersonGrid = props => {
  const {
    persons
  } = props;

  const classes = styles(props);

  return (
    <div className={classes.root}>
      <Grid 
        spacing={1} 
        container
      >
      {persons.map(p => (
        <Grid key={p.id} item>
          <PersonItem 
            classes={{
              label: classes.label,
              avatar: classes.avatar,
            }}
            label={p.fullName}
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