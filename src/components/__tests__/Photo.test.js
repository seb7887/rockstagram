/* eslint-env jest */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';

import Photo from '../Photo';

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

const incrementLikes = jest.fn();

const mockedProps = {
  post,
  incrementLikes,
  comments
}

describe('<Photo/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Photo key={8} {...mockedProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays a photo correctly', () => {
    const { getByTestId } = render(
      <Router>
        <Photo key={8} {...mockedProps} />
      </Router>
    );

    expect(getByTestId('caption').textContent).toContain('This is a test');
    expect(getByTestId('count').textContent).toContain('1');
  });

  it('increments likes', () => {
    const { getByTestId } = render(
      <Router>
        <Photo key={8} {...mockedProps} />
      </Router>
    );

    fireEvent.click(getByTestId('likes'));

    expect(incrementLikes).toHaveBeenCalledTimes(1);
  });
});
