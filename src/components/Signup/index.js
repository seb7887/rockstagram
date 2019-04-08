import React from 'react';
import SignupForm from './SignupForm';
import mobile from '../../images/mobile.svg';

import { Container } from './style';

const Signup = () => (
  <Container>
    <img src={mobile} alt='mobile' />
    <h1>Rockstagram</h1>
    <h2>Sign up to see your friend's photos and videos</h2>
    <SignupForm />
    <p>Have an account? Login</p>
  </Container>
);

export default Signup;
