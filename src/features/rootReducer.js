import { combineReducers } from 'redux';
import personsReducer from './persons/personsSlice';
import groupsReducer from './groups/groupsSlice';

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
});