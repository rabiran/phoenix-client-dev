import { combineReducers } from 'redux';
import groupsReducer from './features/groups/groupsSlice';
import personsReducer from './features/persons/personsSlice';

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
});