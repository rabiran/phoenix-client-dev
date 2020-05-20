import { all } from 'redux-saga/effects';
import groupsRoot from './groups/groupSaga';

export default function* rootSaga() {
  yield all([
    groupsRoot()
  ]);
}