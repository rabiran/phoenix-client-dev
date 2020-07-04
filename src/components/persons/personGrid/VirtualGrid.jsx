import React, { forwardRef, useMemo, memo } from 'react';
import { FixedSizeGrid, areEqual } from 'react-window';
import { useTheme } from '@material-ui/styles';
import PersonItem from './PersonGridItem';
import ReactResizeDetector from 'react-resize-detector';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';


const MIN_COLS = 1;

const flatIndex = (row, col, maxCol) => row * maxCol + col; 

const getFlatArrayItem = (row, col, maxCol, arr) => {
  const index = flatIndex(row, col, maxCol);
  if (index >= arr.length) return null;
  return arr[index];
}

const defaultItemRenderer = ({ itemData, style }) => (
  <PersonItem 
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

const getCellComponent = ({ padding, numOfCols, itemRenderer }) => 
  memo(({ columnIndex, rowIndex, style, data, isScrolling }) => {
    const itemData = getFlatArrayItem(rowIndex, columnIndex, numOfCols, data);
    const itemStyle = {
      ...style,
      width: style.width - padding,
      height: style.height - padding,
      padding: padding / 2,
    };
    const renderItem = itemRenderer || defaultItemRenderer;
    return itemData ? renderItem({ itemData, style: itemStyle }) : null;
  }, areEqual);
  

const VirtualGrid = ({
  persons,
  itemWidth,
  itemHeight,
  spacing = 0,
  itemsInRow,
  itemRenderer,
  style
}) => {
  const theme = useTheme();
  const padding = theme.spacing(spacing);
  // const InnerElementType = useMemo(() => getInnerElementType({ padding }), [padding]);
  
  return (
    <ReactResizeDetector handleWidth handleHeight>
      {({ width, height }) => {
        const numOfCols = itemsInRow || (width ? 
          Math.max(Math.floor((width - padding) / (itemWidth + padding)), MIN_COLS) 
          : 0);
        const numOfrows = numOfCols ? Math.ceil(persons.length / numOfCols) : 0;
        const Cell = getCellComponent({ padding, numOfCols, itemRenderer });
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
            overscanRowCount={3}
            useIsScrolling
          >
            {Cell}
          </FixedSizeGrid>);
      }}
    </ReactResizeDetector>
  )
}

VirtualGrid.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Width (in pixels) of each gridItem
   */
  itemWidth: PropTypes.number.isRequired,
  /**
   * Heught (in pixels) of each gridItem
   */
  itemHeight: PropTypes.number.isRequired,
  /**
   * Spacing units between grid items
   */
  spacing: PropTypes.number,
  /**
   * number of items to display in each row. if not given this number will 
   * be calculated automatically based on the parent width & height
   */
  itemsInRow: PropTypes.number,
  /**
   * Custom item renderer, to render items other than the default `PersonGridItem`.
   * function signature: `({ itemData, style }) => ReactElement`
   * where `itemData` is the person object corresponding to the rendered item.
   * `style` - a style object to be applied to the root element of the rendered item
   */
  itemRenderer: PropTypes.func
}

export default VirtualGrid;
