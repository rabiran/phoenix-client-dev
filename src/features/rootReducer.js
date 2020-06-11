import { combineReducers } from 'redux';
import groupsReducer from './groups/groupsSlice';
import personsReducer from "./persons/personsSlice";
import { componentReducers } from "./apiComponents";

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
  component: componentReducers,
});