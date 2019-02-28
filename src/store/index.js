import { createStore, compose } from 'redux';

import rootReducer from './reducers';

// Fake data
import comments from '../data/comments';
import posts from '../data/posts';

const defaultState = {
  posts,
  comments,
};

const enhacers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const store = createStore(rootReducer, defaultState, enhacers);

export default store;
