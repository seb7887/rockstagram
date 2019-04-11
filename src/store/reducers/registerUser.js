import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actionTypes';

const initialState = {
  isPending: false,
  success: false,
  error: null,
  user: {},
};

export const registerUser = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case REGISTER_USER:
      return {
        isPending: true,
        success: false,
        error: null,
        user: {},
      };
    case REGISTER_USER_SUCCESS:
      return {
        isPending: false,
        success: true,
        error: null,
        user: response,
      };
    case REGISTER_USER_ERROR:
      return {
        isPending: false,
        success: false,
        error: response,
        user: {},
      };
    default:
      return state;
  }
};
