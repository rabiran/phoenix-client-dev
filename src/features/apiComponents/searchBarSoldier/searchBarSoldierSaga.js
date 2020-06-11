import { put, call, takeEvery, all } from 'redux-saga/effects';
import { loadSoldierError, loadSoldierLoading, loadSoldierSuccess } from './searchBarSoldierSlice';
import apiPersons from '../../../api/persons/api';

/**
 * watches for `fetchChildrenRequest` actions and fires `fetchChildren` saga.
 * takes only the latest action, and cancels still running `fetchChildren` sagas.
 */
export function* watchSearchSoldier() {
  yield takeEvery(loadSoldierLoading.type, fetchSoldier)
}

/**
 * fetches a group's chil dren (group's id in the supplied action) 
 * and dispatches `fetchChildrenSuccess` action.
 * @param {*} action action of type `fetchChildrenRequest`
 */
function* fetchSoldier({payload}) {
  const { personalNumber } = payload;
  try {
    const person = yield call(apiPersons.fetchByPersonalNumber, personalNumber);
    yield put(loadSoldierSuccess({person}));    
  } catch (error) {
    yield put(loadSoldierError({error: error.response.data}));        
  }
}


export default function* rootSaga() {
  yield all([
    watchSearchSoldier(),  
  ]);
}
