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
 * watches for `fetchChildrenRequest` actions and fires `fetchChildren` saga.
 * takes only the latest action, and cancels still running `fetchChildren` sagas.
 */
function* watchSoldierTab() {
  yield takeEvery(loadSoldierLoading.type, fetchSoldier);
  yield takeEvery(updateSoldierLoading.type, updateSoldier);
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

/**
 * fetches a group's chil dren (group's id in the supplied action) 
 * and dispatches `fetchChildrenSuccess` action.
 * @param {*} action action of type `fetchChildrenRequest`
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