import { combineReducers } from 'redux';
import personsReducer from './persons/personsSlice';
import groupsReducer from './groups/groupsSlice';
import errorReducer, { SLICE_NANE as errors} from './errorSlice';

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
  [errors]: errorReducer,
});