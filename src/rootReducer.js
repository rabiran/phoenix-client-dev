import { combineReducers } from 'redux';
import groupsReducer from './features/groups/groupsSlice';

export default combineReducers({
  groups: groupsReducer,
});