import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchByGroupId as fetchByGroupIdAction, fetchByGroupIdSuccess } from './personsSlice';
import { fetchByGroupId } from 'api/persons';

function* watchFetchByGroupId() {
  yield takeEvery(fetchByGroupIdAction.type, fetchByGroupIdSaga);
}

function* fetchByGroupIdSaga(action) {
  const { id } = action.payload;
  const persons = yield call(fetchByGroupId, id);
  yield put(fetchByGroupIdSuccess({ persons, groupId: id }));
}

export default function* rootSaga() {
  yield all([
    watchFetchByGroupId()
  ]);
}
