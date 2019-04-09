import { SET_CURRENT_USER } from '../actionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {},
};

export const currentUser = (state = initialState, action) => {
  const isValid = action.user ? !!Object.keys(action.user).length : false;
  console.log('isValid', isValid);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: isValid, // > 0
        currentUser: action.user,
      };
    default:
      return state;
  }
};
