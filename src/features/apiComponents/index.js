import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
/* import searchBarSoldierReducer from "./searchBarSoldier/searchBarSoldierSlice";
import searchBarSoldierSaga from "./searchBarSoldier/searchBarSoldierSaga";
import soldierFormSubmitSaga from "./soldierFormSubmit/soldierFormSubmitSaga";
import soldierFormSubmitReducer from "./soldierFormSubmit/soldierFormSubmitSlice"; */
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