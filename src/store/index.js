import { createStore, compose, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';

import createSagaMiddleware from 'redux-saga';
import { initSagas } from './initSagas';

import { getQuery } from '../utility/getQuery';
import rootReducer from './reducers';

// Fake data
import comments from '../data/comments';
import posts from '../data/posts';

const defaultState = {
  posts,
  comments,
};

const stateTransformer = state => {
  return Iterable.isIterable(state) ? state.toJS() : state;
};

const logger = createLogger({
  stateTransformer,
});

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (getQuery()['logger']) {
    middlewares.push(logger);
  }

  const enhacers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStore(rootReducer, defaultState, enhacers);
  initSagas(sagaMiddleware);
  return store;
};

export default configureStore;
