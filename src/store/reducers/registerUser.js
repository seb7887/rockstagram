import { REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../actionTypes';

export const registerUser = (state = [], action) => {
  const response = action.response;

  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, response };
    case REGISTER_USER_ERROR:
      return { ...state, response };
    default:
      return state;
  }
};
