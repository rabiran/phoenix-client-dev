import personReducer from './personsSlice';
import waitingListReducer from './waitingList/reducer';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  entities: personReducer,
  waitingList: waitingListReducer
});