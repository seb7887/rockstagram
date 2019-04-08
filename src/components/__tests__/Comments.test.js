/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, fireEvent } from 'react-testing-library';

import Comments from '../Comments';
import theme from '../../shared/theme';

let comments = {
  test: [
    {
      text: 'This is a test',
      user: 'kingmob',
    },
  ],
};

const removeComment = jest.fn();
const addComment = jest.fn();

let mockedProps = {
  match: {
    params: {
      postId: 'test',
    },
  },
  comments,
  removeComment,
  addComment,
};

describe('<Comments/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <Comments {...mockedProps} />
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays comments correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Comments {...mockedProps} />
      </ThemeProvider>,
    );

    expect(getByTestId('comment').textContent).toContain('This is a test');
  });

  it('adds a new comment', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Comments {...mockedProps} />
      </ThemeProvider>,
    );

    fireEvent.change(getByTestId('author'), { target: { value: 'test' } });
    fireEvent.change(getByTestId('text'), { target: { value: 'hey!' } });

    fireEvent.submit(getByTestId('form'));

    expect(addComment).toHaveBeenCalledTimes(1);
  });

  it('removes a comment', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Comments {...mockedProps} />
      </ThemeProvider>,
    );

    fireEvent.click(getByTestId('remove-comment'));

    expect(removeComment).toHaveBeenCalledTimes(1);
  });
});
