import { takeLatest, put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchGroupsSuccess } from './groupsSlice';
import { fetchChildren2 } from 'api/groups';
import _ from 'lodash';

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
  const groups = yield call(fetchChildren2, id);
  yield put(fetchGroupsSuccess({ groups }));
  const subChildren = yield all(groups.slice(1).map(g=> call(fetchChildren2, g.id)));
  const flattend = _.flatten(subChildren);
  yield put(fetchGroupsSuccess({groups: flattend}));
}
