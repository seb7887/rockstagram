/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';

import Photo from '../Photo';
import theme from '../../shared/theme';

const comments = {
  test: [
    {
      text: 'hey!',
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

const incrementLikes = jest.fn();

const mockedProps = {
  post,
  incrementLikes,
  comments,
};

describe('<Photo/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <Photo key={8} {...mockedProps} />
        </ThemeProvider>
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays a photo correctly', () => {
    const { getByTestId } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <Photo key={8} {...mockedProps} />
        </ThemeProvider>
      </Router>,
    );

    expect(getByTestId('caption').textContent).toContain('This is a test');
    expect(getByTestId('count').textContent).toContain('1');
  });

  it('increments likes', () => {
    const { getByTestId } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <Photo key={8} {...mockedProps} />
        </ThemeProvider>
      </Router>,
    );

    fireEvent.click(getByTestId('likes'));

    expect(incrementLikes).toHaveBeenCalledTimes(1);
  });
});
