import { SET_CURRENT_USER, REGISTER_USER, LOGIN_USER } from '../actionTypes';

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
