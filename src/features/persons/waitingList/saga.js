import { put, takeLeading, all, select } from 'redux-saga/effects';
import { safeCall } from 'utils/saga.helpers';
import { fetchWaitingListByGroupId } from 'api/persons';
import {
  fetchWaitingListOfGroup, 
  fetchWaitingListOfGroupSuccess, 
  fetchWaitingListOfGroupError
} from './';
import { selectUser, selectIsUserCanEdit } from 'features/auth/authSlice';



function* watchFetchWaitingList () {
  yield takeLeading(fetchWaitingListOfGroup.type, fetchWaitingList);
}

function* fetchWaitingList() {
  const fetchWaitingList = yield select(selectIsUserCanEdit);
  if(!fetchWaitingList) {
    return;
  }
  const { responsibilityLocation } = yield select(selectUser);
  const { result: waitingPersons, error } = yield safeCall(fetchWaitingListByGroupId, responsibilityLocation);
  if(!error) {
    yield put(fetchWaitingListOfGroupSuccess({ persons: waitingPersons }));
  } else {
    yield put(fetchWaitingListOfGroupError(error));
  }
}

export default function* init() {
  yield put(fetchWaitingListOfGroup());
  yield all([
    watchFetchWaitingList()
  ]);
}