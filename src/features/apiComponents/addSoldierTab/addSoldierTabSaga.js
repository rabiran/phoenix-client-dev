import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  loadSoldierLoading,
  loadSoldierError,
  loadSoldierSuccess,
  updateSoldierLoading,
  updateSoldierError,
  updateSoldierSuccess
} from './addSoldierTabSlice';
import apiPersons from '../../../api/persons/api';
import { setPersons } from "../../persons/personsSlice";

/**
 * watches for `loadSoldierLoading` and 'updateSoldierLoading' actions and fires `fetchSoldier` or 'updateSoldier' saga.
 */
function* watchSoldierTab() {
  yield takeEvery(loadSoldierLoading.type, fetchSoldier);
  yield takeEvery(updateSoldierLoading.type, updateSoldier);
}

/**
 * fetches a person and dispatches `loadSoldierSuccess` action. 
 */
function* fetchSoldier({ payload }) {
  const { personalNumber } = payload;
  try {
    const person = yield call(apiPersons.fetchByPersonalNumber, personalNumber);
    yield put(loadSoldierSuccess({ person }));
  } catch (error) {
    yield put(loadSoldierError({ error: error.response.data }));
  }
}

/**
 * Save soldier in Kartoffel 
 */
function* updateSoldier({ payload }) {
  const { personId, personUpdate, directGroup } = payload;
  try {
    let person = (yield call(apiPersons.updatePerson, personId, personUpdate)).data;
    if (directGroup) {
      person = (yield call(apiPersons.updateDirectGroup, personId, directGroup)).data;
    }
    yield put(updateSoldierSuccess({ person }));
    yield put(setPersons({ person }))
  } catch (error) {
    yield put(updateSoldierError({ error: error.response.data }));
  }
}

export default function* rootSaga() {
  yield all([
    watchSoldierTab(),
  ]);
}