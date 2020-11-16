import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import editSoldierTabSaga from "./editSoldierTab/editSoldierTabSaga";
import editSoldierTab from "./editSoldierTab/editSoldierTabSlice";

export const componentReducers = combineReducers({
    editSoldierTab,
});
export const componentSaga = function* rootSaga() {
    yield all([
        editSoldierTabSaga(),
    ]);
};