import { REGISTER_USER, LOGIN_USER, AUTH_USER } from '../actionTypes';

export const registerUser = user => {
  return {
    type: REGISTER_USER,
    user,
  };
};

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const authUser = user => {
  return {
    type: AUTH_USER,
    user,
  };
};
