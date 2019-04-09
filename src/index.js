import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { config } from './config';
import App from './containers/App';
import configureStore from './store';

const store = configureStore();

const router = (
  <Provider store={store}>
    <Router basename={config.prodUrl}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
