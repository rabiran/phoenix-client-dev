import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import PropTypes from 'prop-types';
import { VirtuosoGrid } from 'react-virtuoso';

const styles = makeStyles({
  root: {},
  label: {},
  avatar: {},
});

const PersonGrid = props => {
  const {
    persons,
    style,
    className
  } = props;

  const classes = styles(props);

  const ListContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
  });

  const ItemContainer = styled('div')({
    padding: '0.5rem',
    width: '100px',
    background: '#f5f5f5',
    display: 'flex',
    flex: 'none',
    alignContent: 'stretch', 

    // '@media (max-width: 1024px)': {
    //   width: '33%',
    // },

    // '@media (max-width: 768px)': {
    //   width: '50%',
    // },

    // '@media (max-width: 480px)': {
    //   width: '100%',
    // }
  })
  
  const ItemWrapper = styled('div')({
    flex: 1,
    textAlign: 'center',
    fontSize: '80%',
    padding: '2rem',
    boxShadow: '0 5px 6px -6px #777',
    background: 'white',
  });
 
  // const renderContainer = ({ ref, style = {} }) =>


  return persons.length > 0 ? (
    <VirtuosoGrid
      className={className}
      style={{...style, overflowX: 'hidden'}}
      totalCount={persons.length}
      ListContainer={({listRef, children, className, style}) => (
        <Grid className={className} ref={listRef} spacing={5} container style={{ ...style, marginBottom: 0 }}>
          {children}
        </Grid>
      )}
      // ListContainer={ListContainer}
      ItemContainer={props => (
        <Grid item {...props} style={{margin: 0}}/>     
      )}
      // ItemContainer={ItemContainer}
      item={index => {
        const person = persons[index];
        return person ? (
          <PersonItem
          classes={{
            label: classes.label,
            avatar: classes.avatar,
          }}
          label={person.fullName}
        />) : null;
      }}
      // item={index => <ItemWrapper>Item {index}</ItemWrapper>}
      overscan={200}
      // computeItemKey={index => `${persons[index].id}tttttt`}
      // scrollingStateChange={scrolling => setIsScrolling(scrolling)}
    />
  ) : null;

  return (
    // <div style={style} className={classes.root}>
      <Grid className={className}
        spacing={5} 
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
    // </div>
  );
};

PersonGrid.propTypes = {
  personIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PersonGrid;  