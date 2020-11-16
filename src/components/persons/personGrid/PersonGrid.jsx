import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import PropTypes from 'prop-types';
import { VirtuosoGrid } from 'react-virtuoso';
import ReactResizeDetector from 'react-resize-detector';
import { FixedSizeGrid } from 'react-window';

const renderVirtualThreshold = 100;
const AVATAR_MARGIN = 5;

const styles = makeStyles({
  root: {},
  label: {},
  avatar: {},
});

const ITEMS_IN_ROW = 9;
const ITEM_WIDTH = 85;
const ITEM_HEIGHT = 120;

function getPersonObject(row, column, flattenedArr) {
  const index = row * ITEMS_IN_ROW + column;
  return index < flattenedArr.length ? flattenedArr[index] : null;
}

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const person = getPersonObject(rowIndex, columnIndex, data);
  return person ? 
    (<PersonItem 
      label={person.fullName} 
      style={style} 
      avatarSize={75} 
      width={ITEM_WIDTH} 
      height={ITEM_HEIGHT}/>) : null;
}

const PersonGrid = ({
  persons,
  className,
  spacing,
  itemWidth,
  GridItemProps,
  itemRenderer,
}) => {
  const classes = styles();
  
  const renderItem = itemRenderer || (person => (
    <PersonItem
      classes={{
        label: classes.label,
        avatar: classes.avatar
      }}
      label={person.fullName}
      width={itemWidth}
      avatarSize={itemWidth - (AVATAR_MARGIN * 2)}
      {...GridItemProps}/>
  ));

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

  

  const renderReactWindow = ({ width, height }) => (
    <FixedSizeGrid
      itemData={persons}
      itemKey={({ columnIndex, data, rowIndex }) => {
        const p = getPersonObject(rowIndex, columnIndex, data);
        return p ? p.id : `${rowIndex*ITEMS_IN_ROW + columnIndex}`;
      }}
      rowCount={Math.ceil(persons.length / ITEMS_IN_ROW)}
      columnCount={ITEMS_IN_ROW}
      rowHeight={ITEM_HEIGHT}
      columnWidth={ITEM_WIDTH}
      height={height || 0}
      width={width || 0}
    >
      {Cell}
    </FixedSizeGrid>
  );

  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({width, height}) => renderReactWindow({width, height})}
      {/* {({width, height}) => 
        persons.length < renderVirtualThreshold 
        ? renderNormalGrid({ width, height })
        : renderVirtualGrid({ width, height })} */}
    </ReactResizeDetector>
  );
};

PersonGrid.defaultProps = {
  spacing: 5,
  itemWith: 100
};

PersonGrid.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Width (in pixels) of each gridItem
   */
  itemWidth: PropTypes.number,
  /**
   * Spacing units between grid items
   */
  spacing: PropTypes.number,
  /**
   * Additional props to pass to the `PersonGridItem` component
   */
  GridItemProps: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    avatarSize: PropTypes.number,
    classes: PropTypes.object,
  }),
  /**
   * Custom item renderer, to render items other than the default `PersonGridItem`.
   * function signature: `personObject => ReactElement`
   */
  itemRenderer: PropTypes.func
};

export default PersonGrid;
