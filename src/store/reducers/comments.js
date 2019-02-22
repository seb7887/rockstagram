import { ADD_COMMENT, REMOVE_COMMENT } from '../actionTypes';

export const comments = (state = [], action = {}) => {
  console.log(state, action);
  return state;
};
