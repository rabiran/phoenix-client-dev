import { all } from 'redux-saga/effects';
import personsRoot from './persons/personSaga';
import groupsRoot from './groups/groupSaga';

export default function* rootSaga() {
  yield all([
    groupsRoot(),
    personsRoot()
  ]);
}