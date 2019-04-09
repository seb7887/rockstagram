import { put, call, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_USER,
  SET_CURRENT_USER,
  REGISTER_USER_ERROR,
} from '../actionTypes';
import { registerUserService } from '../../services';

function* registerUser(payload) {
  try {
    const response = yield call(registerUserService, payload);
    console.log('r', response);
    yield put({ type: SET_CURRENT_USER, response });
  } catch (err) {
    console.log('err', err);
    yield put({ type: REGISTER_USER_ERROR, err });
  }
}

export function* registerUserSaga() {
  yield takeLatest(REGISTER_USER, registerUser);
}
