import { createStore, compose, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import { routerMiddleware } from 'connected-react-router/immutable';

import createSagaMiddleware from 'redux-saga';
import { initSagas } from './initSagas';

import { getQuery } from '../utils/getQuery';
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

const configureStore = history => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (getQuery()['logger']) {
    middlewares.push(logger);
  }

  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    : f => f;
  const composables = [applyMiddleware(...middlewares), devTools];
  const enhancer = compose(...composables);

  const store = createStore(rootReducer, defaultState, enhancer);
  initSagas(sagaMiddleware);
  return store;
};

export default configureStore;
