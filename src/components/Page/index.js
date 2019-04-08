import React from 'react';
import Main from '../Main';
import PhotoGrid from '../PhotoGrid';
import Signup from '../Signup';

const Page = props => {
  if (!props.currentUser) {
    return <Signup />;
  } else {
    return (
      <Main>
        <PhotoGrid {...props} />
      </Main>
    );
  }
};

export default Page;
