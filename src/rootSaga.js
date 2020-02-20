import { all } from 'redux-saga/effects';
import groupsRoot from './features/groups/groupSaga';

export default function* rootSaga() {
  yield all([
    groupsRoot()
  ]);
}