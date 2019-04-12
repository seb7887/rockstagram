import { put, call, takeLatest } from 'redux-saga/effects';
import { AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR } from '../actionTypes';

import { authService } from '../../services';

function* auth() {
  try {
    //const response = yield call(authService);
    const response = {};
    console.log('hey');
    yield put({ type: AUTH_USER_SUCCESS, response });
  } catch (err) {
    yield put({ type: AUTH_USER_ERROR, err });
  }
}

export function* authSaga() {
  yield takeLatest(AUTH_USER, auth);
}
