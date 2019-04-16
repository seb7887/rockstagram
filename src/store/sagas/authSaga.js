import { put, call, take, cancel, takeLatest } from 'redux-saga/effects';
import { AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR } from '../actionTypes';

import { authService } from '../../services';
import { LOCATION_CHANGE } from 'connected-react-router';

function* auth() {
  try {
    const response = yield call(authService);

    if (response.status !== 200) {
      throw new Error('Unauthorized');
    }

    yield put({ type: AUTH_USER_SUCCESS, response });
  } catch (err) {
    yield put({ type: AUTH_USER_ERROR, err });
  }
}

export function* authSaga() {
  const watcher = yield takeLatest(AUTH_USER, auth);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
