import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import PhotoGrid from './components/PhotoGrid';
import './index.css';

ReactDOM.render(
  <Router>
    <Main>
      <PhotoGrid />
    </Main>
  </Router>,
  document.getElementById('root')
);