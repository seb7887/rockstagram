import React from 'react';
import Main from '../components/Main';
import PhotoGrid from '../components/PhotoGrid';

const Page = (props) => (
  <Main>
    <PhotoGrid {...props} />
  </Main>
);

export default Page;
