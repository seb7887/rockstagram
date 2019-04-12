import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../actionTypes';

const initialState = {
  isPending: false,
  success: false,
  isAuthenticated: false,
  currentUser: {},
  error: null,
};

export const loginUser = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case LOGIN_USER:
      return {
        isPending: true,
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        isPending: false,
        success: true,
        isAuthenticated: true,
        currentUser: response,
      };
    case LOGIN_USER_ERROR:
      return {
        isPending: false,
        success: false,
        error: response,
        ...state,
      };
    default:
      return state;
  }
};
