import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchChildrenSuccess } from './groupsSlice';
import { fetchGroupChildren } from 'api/groups';

/**
 * watches for `fetchChildrenRequest` actions and fires `fetchChildren` saga.
 * takes only the latest action, and cancels still running `fetchChildren` sagas.
 */
export function* watchFetchChildrenRequest() {
  yield takeLatest(fetchChildrenRequest.type, fetchChildren)
}

/**
 * fetches a group's children (group's id in the supplied action) 
 * and dispatches `fetchChildrenSuccess` action.
 * @param {*} action action of type `fetchChildrenRequest`
 */
function* fetchChildren(action) {
  const id = action.payload;
  const children = yield call(fetchGroupChildren, id);
  yield put(fetchChildrenSuccess({ parentId: id, children }));
}
