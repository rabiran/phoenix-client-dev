import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchChildrenSuccess } from './groupsSlice';
import { fetchGroupChildren } from 'api/groups';

export function* watchFetchChildrenRequest() {
  yield takeLatest(fetchChildrenRequest.type, fetchChildren)
}

function* fetchChildren(action) {
  const id  = action.payload;
  const children = yield call(fetchGroupChildren, id);
  yield put(fetchChildrenSuccess({ parentId: id, children }));
}
