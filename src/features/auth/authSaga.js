import { put, delay } from 'redux-saga/effects';
import { getUser } from 'api/auth';
import { safeCall, safe } from 'utils/saga.helpers';
import { loginSuccess, loginError } from './authSlice';


const mockAuth = process.env.REACT_APP_MOCK_AUTH === 'true';

function* _login() {
  const { result: user, error } = yield safeCall(getUser);
  if(!error) {
    yield put(loginSuccess({ user }))
  } else {
    yield put(loginError(error))
  }
  return { error }
}

function* fakeLogin(){
  const user = {
    "firstName": "נייקי",
    "lastName": "אדידס",
    "domainUsers": [
    {
    "dataSource": "dataSource1",
    "uniqueID": "t23458789@jello.com",
    "adfsUID": "t23458789@jellouid"
    }
    ],
    "address": "רחוב הממתקים 34",
    "clearance": "0",
    "createdAt": "2020-02-26T15:01:06.870Z",
    "currentUnit": "nitro unit",
    "directGroup": "5e56858e4203fc40043591a5",
    "entityType": "digimon",
    "fullName": "נייקי אדידס",
    "hierarchy": [
    "כובעי הקש"
    ],
    "identityCard": "312571458",
    "job": "רוצח",
    "mail": "t23458789@jello.com",
    "mobilePhone": [
    "052-1234567"
    ],
    "phone": [
    "026666998"
    ],
    "rank": "mega",
    "responsibility": "none",
    "status": "active",
    "updatedAt": "2020-10-22T05:38:29.964Z",
    "id": "5e5688324203fc40043591aa",
    "dischargeDay": "2022-11-30T22:00:00.000Z",
    "personalNumber": "5666666"
  }
  yield delay(3000);
  yield put(loginSuccess({ user }))
  return { error: null };
}


export const login = mockAuth ? fakeLogin : _login;
