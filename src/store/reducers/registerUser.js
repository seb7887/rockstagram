import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from '../actionTypes';

const initialState = {
  isPending: false,
  success: false,
  message: '',
  error: '',
  user: {},
};

export const registerUser = (state = initialState, action) => {
  const response = action.response;

  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isPending: true,
        message: '',
        error: '',
        user: {},
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isPending: false,
        success: true,
        message: 'Successfully created account',
        error: '',
        user: response,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isPending: false,
        success: false,
        message: '',
        error: 'Error',
        user: {},
      };
    default:
      return state;
  }
};
