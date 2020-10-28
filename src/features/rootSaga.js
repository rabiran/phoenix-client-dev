import { all, call } from 'redux-saga/effects';
import personsRoot from './persons/personSaga';
import groupsRoot from './groups/groupSaga';
import { login } from './auth/authSaga';


export default function* rootSaga() {
  const { error } = yield call(login);
  if(error) {
    console.log('loginFailed');
    return;
  }
  yield all([
    groupsRoot(),
    personsRoot()
  ]);
}