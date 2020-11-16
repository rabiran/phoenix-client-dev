import { put, call, takeEvery, all } from 'redux-saga/effects';
import { safeCall, safe } from 'utils/saga.helpers';

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
  const { result: person, error } = yield safeCall(apiPersons.fetchByPersonalNumber, personalNumber);
  if(!error) {
    yield put(fetchSoldierSuccess(person));
  } else {
    yield put(fetchSoldierError(error));
  }
}

/**
 * Save soldier in Kartoffel 
 */
function* updateSoldier({ payload }) {
  const { personId, personUpdate } = payload;
  // change 'directGroup' parameter name to match api
  const { directGroup: directGroupId, ...rest } = personUpdate;
  const toUpdate = { directGroupId, ...rest };

  const { result: person, error } = yield safeCall(apiPersons.updatePerson, personId, toUpdate);
  if(!error) {
    yield put(updateSoldierSuccess(person));
    yield put(setPerson(person))
  } else {
    yield put(updateSoldierError(error));
  }
}

export default function* rootSaga() {
  yield all([
    watchSoldierTab(),
  ]);
}