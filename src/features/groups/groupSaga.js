import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchGroupsSuccess, subtreeLoaded, setRootGroupsIds } from './groupsSlice';
import {fetchGroupById, fetchSubtree, getRootGroupId} from 'api/groups/index';
// import { fetchSubtree } from 'api/mockApi';

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
  const id = action.payload;
  const groups = yield call(fetchSubtree, id);
  // mark the root id as 'subtree loaded'
  yield put(subtreeLoaded({ id }));
  yield put(fetchGroupsSuccess({ groups, upsert: false }));
}

// function* fetchAllGroups() {
//   const groups = yield call(fetchAll);
//   yield put(fetchGroupsSuccess({ groups }));
// }

function* initRootGroup() {
  const rootId = yield call(getRootGroupId);
  const rootGroup = yield call(fetchGroupById, rootId);
  // fetch the root's children
  const groups = yield call(fetchSubtree, rootId);

  /* Direct children as root groups */
  // yield put(fetchGroupsSuccess({ groups }))
  // yield put(setRootGroupsIds({ ids: rootGroup.children }));

  /* Group as single root */

  yield put(fetchGroupsSuccess({ groups: [rootGroup, ...groups] }));
  yield put(subtreeLoaded({ id: rootId }))
  yield put(setRootGroupsIds({ ids: [rootId] }));

}

export default function* rootSaga() {
  yield all([
    initRootGroup(),
    watchFetchChildrenRequest(), 
    // fetchAllGroups()
  ]);
}
