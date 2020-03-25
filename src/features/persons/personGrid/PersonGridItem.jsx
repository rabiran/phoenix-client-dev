import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { selectById } from '../personsSlice';
import PropTypes from 'prop-types';

const styles = makeStyles({
  root: {},
  label: {
    textAlign: 'center', 
    wordWrap: 'break-word', 
    maxWidth: '75px'
  },
  avatar: {
    width: '70px', 
    height: '70px', 
    margin: '0 auto' // equal margin in left & right - avatar in center
  },
});

export const PersonGridItem = props => {
  const { name } = props;
  const classes = styles(props);
  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar}></Avatar>    
      <div className={classes.label}><Typography>{ name }</Typography></div>
    </div>
  );
};

PersonGridItem.propTypes = {
  name: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const person = selectById(state, ownProps.personId) || {};
  return { name: person.name };
};

const ConnectedItem = connect(mapStateToProps)(PersonGridItem);

ConnectedItem.propTypes = {
  personId: PropTypes.string.isRequired,
};


export default ConnectedItem;
