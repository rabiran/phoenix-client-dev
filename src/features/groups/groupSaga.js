import { put, call, takeEvery, all } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchChildrenSuccess } from './groupsSlice';
import { fetchGroupById, fetchSubtree, getRootGroupId } from 'api/groups';
import { safe } from 'utils/saga.helpers';

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
  const { result: groups, error } = yield safe(call(fetchSubtree, id));
  if(!error) {
    yield put(fetchChildrenSuccess({ groups, upsert: false, parentId: id }));
  }
  
}

function* initRootGroup() {
  // get root id (in the real app it will come from the authenticated user)
  const rootId = yield call(getRootGroupId);
  // request the root children
  yield put(fetchChildrenRequest({ id: rootId }));
  // request the root group itslef
  const { result: rootGroup, error } = yield safe(call(fetchGroupById, rootId));
  if(!error) {
    // root group fetched - put success action 
    yield put(fetchChildrenSuccess({ groups: [rootGroup] }));
  }
}

export default function* rootSaga() {
  yield all([
    initRootGroup(),
    watchFetchChildrenRequest(), 
  ]);
}
