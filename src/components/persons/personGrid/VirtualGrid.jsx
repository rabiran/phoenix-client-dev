import React, { forwardRef } from 'react';
import { FixedSizeGrid } from 'react-window';
import { useTheme } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import ReactResizeDetector from 'react-resize-detector';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';

const MIN_COLS = 1;
const OVERSCAN_ROW_COUNT = 3;

/**
 * Returns the index of a grid cell in a flat 1-D arary
 * @param {Number} row grid row index
 * @param {Number} col grid column index
 * @param {Number} numOfCols number of columns
 */
const flatIndex = (row, col, numOfCols) => row * numOfCols + col; 

/**
 * Returns the element in a 1-D array corresponding to grid indices (row, column) 
 * or null if the index is out of bounds
 * @param {Number} row grid row index
 * @param {Number} col grid column index
 * @param {Number} numOfCols number of columns
 * @param {Array} arr array
 */
const getFlatArrayItem = (row, col, numOfCols, arr) => {
  const index = flatIndex(row, col, numOfCols);
  return index < arr.length ? arr[index] : null;
}

/**
 * Renders a `PersonGridItem`.
 * function signature `({ itemData, style, onItemClick }) => React.Element`
 * @param {*} p.itemData rendered item data
 * @param {Srting} p.style style to be applied to the root element
 * @param {Function} p.onItemClick callback function to call when item clicked
 *                                 `(clickEvent, itemData) => void`
 */
const defaultItemRenderer = ({ itemData, style, onItemClick }) => (
  <PersonItem
    onClick={e => onItemClick(e, itemData)}
    label={itemData.fullName} 
    style={style}/>
);

const InnerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      overflowX: 'hidden',
    }}
    {...rest}
  />
));

const VirtualGrid = ({
  persons,
  onItemClick = () => {},
  itemWidth,
  itemHeight,
  spacing = 0,
  itemsInRow,
  itemRenderer,
  style
}) => {
  const theme = useTheme();
  const padding = theme.spacing(spacing);
  
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => {
        const numOfCols = itemsInRow || (width ? 
          Math.max(Math.floor((width - padding) / (itemWidth + padding)), MIN_COLS) 
          : 0);
        const numOfrows = numOfCols ? Math.ceil(persons.length / numOfCols) : 0;
        return (
          <FixedSizeGrid
            style={style}
            itemData={persons}
            itemKey={({ columnIndex, data, rowIndex }) => {
              const p = getFlatArrayItem(rowIndex, columnIndex, numOfCols, data);
              return p ? p.id : uniqid();
            }}
            innerElementType={InnerElementType}
            rowCount={numOfrows}
            rowHeight={itemHeight + padding}
            columnCount={numOfCols}
            columnWidth={itemWidth + padding}
            height={height || 0}
            width={width || 0}
            direction={theme.direction}
            overscanRowCount={OVERSCAN_ROW_COUNT}
            useIsScrolling>
            {({ columnIndex, rowIndex, style, data }) => {
              const itemData = getFlatArrayItem(rowIndex, columnIndex, numOfCols, data);
              const itemStyle = {
                ...style,
                width: style.width - padding, // real item dimensions
                height: style.height - padding,
                padding: padding / 2,
              };
              const renderItem = itemRenderer || defaultItemRenderer;
              return itemData ? renderItem({ itemData, style: itemStyle, onClick: onItemClick }) : null;
            }}
          </FixedSizeGrid>);
      }}
    </ReactResizeDetector>
  )
}

VirtualGrid.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Function to call when grid item is being clicked.
  
   * Signature: `(clickEvent, itemData) => void`
   */
  onItemClick: PropTypes.func,
  /**
   * Width (in pixels) of each gridItem
   */
  itemWidth: PropTypes.number.isRequired,
  /**
   * Height (in pixels) of each gridItem
   */
  itemHeight: PropTypes.number.isRequired,
  /**
   * Spacing units between grid items
   */
  spacing: PropTypes.number,
  /**
   * number of items to display in each row. if not given this number will 
   * be calculated automatically based on the parent width
   */
  itemsInRow: PropTypes.number,
  /**
   * Custom item renderer, to render items other than the default `PersonGridItem`.
   * function signature: `({ itemData, style, onItemClick }) => ReactElement` where:
  
   * `itemData` is the person object corresponding to the rendered item.

   * `style` - a style object to be applied to the root element of the rendered item
   
   * `onItemClick` - the `onItemClick` prop passed to the grid component
   */
  itemRenderer: PropTypes.func
}

export default VirtualGrid;
