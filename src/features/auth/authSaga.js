import { put, call, takeEvery, all } from 'redux-saga/effects';
import { getUser } from 'api/auth';
import { safeCall, safe } from 'utils/saga.helpers';
import { loginSuccess, loginError } from './authSlice';


export function* login() {
  const { result: user, error } = yield safeCall(getUser);
  if(!error) {
    yield put(loginSuccess({ user }))
  } else {
    yield put(loginError(error))
  }
  return { error }
}

