/* eslint-env jest */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-testing-library';

import Main from '../Main';

const Children = () => <div>Children</div>;

describe('<Main/>', () => {
  it('renders and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Main>
          <Children />
        </Main>
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
