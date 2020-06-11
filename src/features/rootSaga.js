import { all } from 'redux-saga/effects';
import groupsRoot from './groups/groupSaga';
import { componentSaga } from "./apiComponents";

export default function* rootSaga() {
  yield all([
    groupsRoot(),
    componentSaga(),
  ]);
}