import { createStore } from 'redux';

import rootReducer from './reducers';

// Fake data
import comments from '../data/comments';
import posts from '../data/posts';

const defaultState = {
  posts,
  comments
};

export const store = createStore(rootReducer, defaultState);

