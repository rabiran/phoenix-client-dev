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
export const getFlatArrayItem = (row, col, numOfCols, arr) => {
  const index = flatIndex(row, col, numOfCols);
  return index < arr.length ? arr[index] : null;
}