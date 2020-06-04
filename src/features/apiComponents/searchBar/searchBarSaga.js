import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchChildrenSuccess } from './searchBarSlice';
import {fetchGroupById, fetchSubtree, getRootGroupId} from 'api/groups';

/**
 * watches for `fetchChildrenRequest` actions and fires `fetchChildren` saga.
 * takes only the latest action, and cancels still running `fetchChildren` sagas.
 */
export function* watchFetchChildrenRequest() {
  yield takeEvery(fetchChildrenRequest.type, fetchChildren)
}

/**
 * fetches a group's children (group's id in the supplied action) 
 * and dispatches `fetchChildrenSuccess` action.
 * @param {*} action action of type `fetchChildrenRequest`
 */
function* fetchChildren(action) {
  const { id } = action.payload;
  const groups = yield call(fetchSubtree, id);
  yield put(fetchChildrenSuccess({ groups, upsert: false, parentId: id }));
}

function* initRootGroup() {
  const rootId = yield call(getRootGroupId);
  const { rootGroup, groups } = yield all({
    rootGroup: call(fetchGroupById, rootId),
    groups: call(fetchSubtree, rootId)
  });

  /* Direct children as root groups */
  // yield put(fetchGroupsSuccess({ groups }))
  // yield put(setRootGroupsIds({ ids: rootGroup.children }));

  /* Group as single root */
  yield put(fetchChildrenSuccess({ groups: [rootGroup] }));
  yield put(fetchChildrenSuccess({ groups, parentId: rootId }));

}

export default function* rootSaga() {
  yield all([
    initRootGroup(),
    watchFetchChildrenRequest(), 
  ]);
}
