import { put, call, takeEvery, all, select } from 'redux-saga/effects';
import { 
  fetchByGroupId as fetchByGroupIdAction, 
  fetchByGroupIdSuccess, 
  fetchByGroupIdError,
  fetchWaitingListOfGroup,
  fetchWaitingListOfGroupSuccess,
  fetchWaitingListOfGroupError,
} from './personsSlice';
import { fetchByGroupId, fetchWaitingListByGroupId } from 'api/persons';
import { getRootGroupId } from 'api/groups';
import { safeCall, safe } from 'utils/saga.helpers';
import { selectUser, Responsibility, selectIsUserCanEdit } from 'features/auth/authSlice';

function* watchFetchByGroupId() {
  yield takeEvery(fetchByGroupIdAction.type, fetchByGroupIdSaga);
}

function* watchFetchWaitingList () {
  yield takeEvery(fetchWaitingListOfGroup.type, fetchWaitingList);
}

function* fetchWaitingList(action) {
  const { id } = action.payload;
  const { result: waitingPersons, error } = yield safeCall(fetchWaitingListByGroupId, id);
  if(!error) {
    yield put(fetchWaitingListOfGroupSuccess({ persons: waitingPersons }));
  } else {
    yield put(fetchWaitingListOfGroupError(error));
  }
}

function* fetchByGroupIdSaga(action) {
  const { id } = action.payload;
  // const { result: persons, error } = yield safe(call(fetchByGroupId, id));
  const { result: persons, error } = yield safeCall(fetchByGroupId, id);
  if(!error) {
    yield put(fetchByGroupIdSuccess({ persons, groupId: id }));
  } else {
    yield put(fetchByGroupIdError(id, error));
  }
}

function* initPersonsSaga() {
  // fetch waiting list if the user has edit permissions
  const user = yield select(selectUser);
  const fetchWaiting = select(selectIsUserCanEdit);
  if(fetchWaiting) {
    yield put(fetchWaitingListOfGroup(user.responsibilityLocation));
  }
}

export default function* rootSaga() {
  yield all([
    watchFetchWaitingList(),
    watchFetchByGroupId(),
    initPersonsSaga(),
  ]);
}
