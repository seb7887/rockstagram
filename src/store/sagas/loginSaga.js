import { put, call, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../actionTypes';
import { loginService } from '../../services';

function* login(payload) {
  try {
    const response = yield call(loginService, payload);
    yield put({ type: LOGIN_USER_SUCCESS, response });
  } catch (err) {
    yield put({ type: LOGIN_USER_ERROR, err });
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN_USER, login);
}
