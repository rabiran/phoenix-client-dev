import { combineReducers } from 'redux';
import groupsReducer from './groups/groupsSlice';

export default combineReducers({
  groups: groupsReducer,
});