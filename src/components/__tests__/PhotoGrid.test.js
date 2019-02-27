/* eslint-env jest */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';

import PhotoGrid from '../PhotoGrid';

const comments = {
  test: [
    {
      text: 'hey!',
      user: 'kingmob'
    }
  ]
}

const post = {
  caption: 'This is a test',
  code: 'test',
  display_src: 'test.jpg',
  id: '7',
  likes: 7
};

const posts = [post];

const incrementLikes = jest.fn();

const mockedProps = {
  posts,
  incrementLikes,
  comments
}

describe('<PhotoGrid/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <PhotoGrid {...mockedProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});