import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import addSoldierTabSaga from "./addSoldierTab/addSoldierTabSaga";
import addSoldierTab from "./addSoldierTab/addSoldierTabSlice";

export const componentReducers = combineReducers({
    addSoldierTab,
});
export const componentSaga = function* rootSaga() {
    yield all([
        addSoldierTabSaga(),
    ]);
};