import { createSelector } from 'reselect';

export const currentUserSelector = createSelector(
  state => state.currentUser,
  currentUser => currentUser,
);
