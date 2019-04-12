import { AUTH_USER, AUTH_USER_SUCCESS, AUTH_USER_ERROR } from '../actionTypes';

const initialState = {
  loading: true,
  redirect: false,
};

export const authUser = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        loading: true,
        redirect: true,
      };
    case AUTH_USER_SUCCESS:
      return {
        loading: false,
        redirect: false,
      };
    case AUTH_USER_ERROR:
      return {
        loading: false,
        redirect: true,
      };
    default:
      return state;
  }
};
