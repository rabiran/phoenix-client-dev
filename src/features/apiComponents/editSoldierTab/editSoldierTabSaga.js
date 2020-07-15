import { put, call, takeEvery, all } from 'redux-saga/effects';
import {
  fetchSoldierRequest,
  fetchSoldierSuccess,
  fetchSoldierError,
  updateSoldierRequest,
  updateSoldierError,
  updateSoldierSuccess,  
} from './editSoldierTabSlice';
import apiPersons from '../../../api/persons/api';
import { setPerson } from "../../persons/personsSlice";

/**
 * watches for `fetchSoldierRequest` and 'updateSoldierRequest' actions and fires `fetchSoldier` or 'updateSoldier' saga.
 */
function* watchSoldierTab() {
  yield takeEvery(fetchSoldierRequest.type, fetchSoldier);
  yield takeEvery(updateSoldierRequest.type, updateSoldier);
}

/**
 * fetches a person and dispatches `fetchSoldierSuccess` action. 
 */
function* fetchSoldier({ payload }) {
  const { personalNumber } = payload;
  try {
    const person = yield call(apiPersons.fetchByPersonalNumber, personalNumber);
    yield put(fetchSoldierSuccess(person));
  } catch (error) {
    yield put(fetchSoldierError(error.response.data));
  }
}

/**
 * Save soldier in Kartoffel 
 */
function* updateSoldier({ payload }) {
  const { personId, personUpdate, directGroup } = payload;
  try {
    let person = (yield call(apiPersons.updatePerson, personId, personUpdate));
    if (directGroup) {
      person = (yield call(apiPersons.updateDirectGroup, personId, directGroup));
    }
    yield put(updateSoldierSuccess(person ));
    yield put(setPerson(person))
  } catch (error) {
    yield put(updateSoldierError(error.response.data));
  }
}

export default function* rootSaga() {
  yield all([
    watchSoldierTab(),
  ]);
}