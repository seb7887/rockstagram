import { createSelector } from 'reselect';

export const currentUserSelector = createSelector(
  state => state.loginUser,
  loginUser => loginUser,
);
