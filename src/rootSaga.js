import { all } from 'redux-saga/effects';
import groupsRoot from './features/groups/groupSaga';
import personsRoot from './features/persons/personSaga';

export default function* rootSaga() {
  yield all([
    groupsRoot(),
    personsRoot()
  ]);
}