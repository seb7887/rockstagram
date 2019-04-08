/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';

import Single from '../Single';
import theme from '../../shared/theme';

const removeComment = jest.fn();
const addComment = jest.fn();
const incrementLikes = jest.fn();

const comments = {
  test: [
    {
      text: 'This is a test',
      user: 'kingmob',
    },
  ],
};

const post = {
  caption: 'This is a test',
  code: 'test',
  display_src: 'test.jpg',
  id: '7',
  likes: 7,
};

const posts = [post];

const mockedProps = {
  match: {
    params: {
      postId: 'test',
    },
  },
  comments,
  posts,
  incrementLikes,
  removeComment,
  addComment,
};

describe('<Single/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <Single {...mockedProps} />
        </ThemeProvider>
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
