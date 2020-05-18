import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import PropTypes from 'prop-types';
import { VirtuosoGrid } from 'react-virtuoso';
import ReactResizeDetector from 'react-resize-detector';

const renderVirtualThreshold = 100;

const styles = makeStyles({
  root: {},
  label: {},
  avatar: {},
});

const PersonGrid = props => {
  const {
    persons,
    className,
    spacing = 3,
    GridItemProps,
  } = props;

  const classes = styles(props);

  const renderItem = person => (
    <PersonItem
      avatarSize={100}
      classes={{
        label: classes.label,
        avatar: classes.avatar
      }}
      label={person.fullName}
      {...GridItemProps}/>
  );

  const renderVirtualGrid = ({ width, height }) => (
    <VirtuosoGrid
      className={className}
      style={{ height, width, overflowX: 'hidden' }}
      totalCount={persons.length}
      overscan={spacing * 120} // heuristic (better: (gridItem.height + spacing)*(width / (gridItem.width + spacing)))
      ListContainer={({ listRef, children, className, style }) => (
        <Grid
          container
          className={className}
          style={{...style, marginBottom: 0 }}
          spacing={spacing}
          ref={listRef}>
          {children}
        </Grid>
      )}
      ItemContainer={props => (
        <Grid item {...props} style={{ margin: 0 }}/>     
      )}
      item={index => {
        const person = persons[index];
        return person ? renderItem(person) : null;
      }}
    />
  );

  const renderGridItems = () => persons.map(p => 
    (<Grid item key={p.id}>{ renderItem(p) }</Grid>));

  const renderNormalGrid = ({ width, height }) => (
    <div style={{ width, height, overflowY: 'auto', overflowX: 'hidden'}}>
      <Grid
        container
        className={className}
        spacing={spacing}
        style={{
          marginBottom: 0,
          marginTop: 0,
        }}>
        { renderGridItems() }
      </Grid>
    </div>
  );

  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({width, height}) => 
        persons.length < renderVirtualThreshold 
        ? renderNormalGrid({ width, height })
        : renderVirtualGrid({ width, height })}
    </ReactResizeDetector>
  );
}

PersonGrid.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PersonGrid;  