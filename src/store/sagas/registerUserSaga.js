import { put, call } from 'redux-saga/effects';
import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../actionTypes';
import { registerUserService } from '../../services';

export function* registerUserSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    console.log('response', response);
    yield [put({ type: REGISTER_USER_SUCCESS, response })];
  } catch (err) {
    yield put({ type: REGISTER_USER_ERROR, err });
  }
}
