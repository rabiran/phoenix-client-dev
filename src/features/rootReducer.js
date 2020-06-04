import { combineReducers } from 'redux';
import groupsReducer from './groups/groupsSlice';
import personsReducer from "./persons/personsSlice";

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
});