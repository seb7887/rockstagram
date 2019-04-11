import { put, call, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actionTypes';
import { registerUserService } from '../../services';

function* registerUser(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield put({ type: REGISTER_USER_SUCCESS, response });
  } catch (err) {
    yield put({ type: REGISTER_USER_ERROR, err });
  }
}

export function* registerUserSaga() {
  yield takeLatest(REGISTER_USER, registerUser);
}
