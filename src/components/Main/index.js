import React from 'react';
import Header from '../Header';

const Main = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

export default Main;
