import React from 'react';

import Main from '../Main';
import PhotoGrid from '../PhotoGrid';

const Page = props => (
  <Main>
    <PhotoGrid {...props} />
  </Main>
);

export default Page;
