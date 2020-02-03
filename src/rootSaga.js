import { all } from 'redux-saga/effects';
import { watchFetchChildrenRequest } from './features/groups/groupSaga';

export default function* rootSaga() {
  yield all([
    watchFetchChildrenRequest()
  ]);
}