import React, { forwardRef } from 'react';
import { FixedSizeGrid } from 'react-window';
import { useTheme } from '@material-ui/styles';
import ReactResizeDetector from 'react-resize-detector';
import PropTypes from 'prop-types';
import { getFlatArrayItem } from './flatArrayHelpers';
import uniqid from 'uniqid';


const MIN_COLS = 1;
const OVERSCAN_ROW_COUNT = 3;

/**
 * Renders a `PersonGridItem`.
 * function signature `({ itemData, style, onItemClick }) => React.Element`
 * @param {*} p.itemData rendered item data
 * @param {Srting} p.style style to be applied to the root element
 * @param {Function} p.onItemClick callback function to call when item clicked
 *                                 `(clickEvent, itemData) => void`
 */
// const defaultItemRenderer = ({ itemData, style, onItemClick }) => (
//   <PersonItem
//     onClick={e => onItemClick(e, itemData)}
//     label={itemData.fullName} 
//     style={style}/>
// );

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
  items,
  itemKey,
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
        const numOfrows = numOfCols ? Math.ceil(items.length / numOfCols) : 0;
        return (
          <FixedSizeGrid
            style={style}
            itemData={items}
            itemKey={ itemKey ? ({ columnIndex, data, rowIndex }) => {
              const item = getFlatArrayItem(rowIndex, columnIndex, numOfCols, data);
              return !!item ? itemKey({ columnIndex, rowIndex, item, data }) : uniqid();
            } : null}
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
              const item = getFlatArrayItem(rowIndex, columnIndex, numOfCols, data);
              const itemStyle = {
                ...style,
                width: style.width - padding, // real item dimensions
                height: style.height - padding,
                padding: padding / 2,
              };
              const renderItem = itemRenderer;
              return item ? renderItem({ item, style: itemStyle, onClick: onItemClick }) : null;
            }}
          </FixedSizeGrid>);
      }}
    </ReactResizeDetector>
  )
}

VirtualGrid.propTypes = {
  items: PropTypes.array,
  /**
   * function to specify each item key: should return unique key for each item.
   
   * called with one object paramter: `{ rowIndex, columnIndex, item, data }`
   */
  itemKey: PropTypes.func,
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
   * function signature: `({ item, style, onItemClick }) => ReactElement` where:
  
   * `item` is the `items` array entry corresponding to the rendered item.

   * `style` - a style object to be applied to the root element of the rendered item
   
   * `onItemClick` - the `onItemClick` prop passed to the grid component
   */
  itemRenderer: PropTypes.func.isRequired
}

export default VirtualGrid;
