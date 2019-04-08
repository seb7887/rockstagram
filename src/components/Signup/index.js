import React from 'react';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm';
import mobile from '../../images/mobile.svg';

import { Container, Subtitle, Image } from './style';
import { Div, Block, Title } from '../common';

const Signup = () => (
  <Container>
    <Image src={mobile} alt='mobile' />
    <Div>
      <Block>
        <Title>Rockstagram</Title>
        <Subtitle>Sign up to see your friend's photos and videos</Subtitle>
        <SignupForm />
      </Block>
      <Block>
        <p>
          Have an account? <Link to='/login'>Login</Link>
        </p>
      </Block>
    </Div>
  </Container>
);

export default Signup;
