import { SET_CURRENT_USER, REGISTER_USER, LOGIN_USER } from '../actionTypes';

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

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
