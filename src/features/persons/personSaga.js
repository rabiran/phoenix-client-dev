import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchByGroupId as fetchByGroupIdAction, fetchByGroupIdSuccess, fetchByGroupIdError } from './personsSlice';
import { fetchByGroupId } from 'api/persons';
import { getRootGroupId } from 'api/groups';
import { safeCall, safe } from 'utils/saga.helpers';

function* watchFetchByGroupId() {
  yield takeEvery(fetchByGroupIdAction.type, fetchByGroupIdSaga);
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
  // in the real app - root id will come from the authenticated user
  const rootId = yield call(getRootGroupId);
  // fetch the members of the root gorup
  yield put(fetchByGroupIdAction(rootId));
}

export default function* rootSaga() {
  yield all([
    // initPersonsSaga(),
    watchFetchByGroupId()
  ]);
}
