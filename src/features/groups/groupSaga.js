import { put, call, takeEvery, all, select } from 'redux-saga/effects';
import { fetchChildrenRequest , fetchChildrenSuccess } from './groupsSlice';
import { fetchGroupById, fetchSubtree, fetchGroupByPath } from 'api/groups';
import { safe } from 'utils/saga.helpers';
import { setError } from 'features/errorSlice';
import { selectUser } from 'features/auth/authSlice';

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
  } else {
    yield put(setError(error));
  }
  
}

function* initRootGroup() {
  // get root group from the user's top hierarchy 
  const user = yield select(selectUser);
  const rootPath = user.hierarchy[0];
  const { result: rootGroup, error } = yield safe(call(fetchGroupByPath, rootPath));
  if(!error) {
    // root group fetched - put success action 
    yield put(fetchChildrenSuccess({ groups: [rootGroup] }));
    // request the root children
    yield put(fetchChildrenRequest({ id: rootGroup.id }));
  }
}

export default function* rootSaga() {
  yield all([
    initRootGroup(),
    watchFetchChildrenRequest(), 
  ]);
}
