/* eslint-env jest */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';

import Main from '../Main';
import theme from '../../shared/theme';

const Children = () => <div>Children</div>;

describe('<Main/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <ThemeProvider theme={theme}>
          <Main>
            <Children />
          </Main>
        </ThemeProvider>
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
