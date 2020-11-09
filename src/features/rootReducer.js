import { combineReducers } from 'redux';
import personsReducer from './persons/personsSlice';
import groupsReducer from './groups/groupsSlice';
import { componentReducers } from "./apiComponents";
import errorReducer, { SLICE_NANE as errors} from './errorSlice';
import authReducer from './auth/authSlice';

export default combineReducers({
  groups: groupsReducer,
  persons: personsReducer,
  components: componentReducers,
  [errors]: errorReducer,
  auth: authReducer
});