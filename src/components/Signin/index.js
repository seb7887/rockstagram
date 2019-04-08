import React from 'react';
import { Link } from 'react-router-dom';

import SigninForm from './SigninForm';

import { Container } from './style';
import { Div, Block, Title } from '../common';

const Signin = () => (
  <Container>
    <Div>
      <Block>
        <Title>Rockstagram</Title>
        <SigninForm />
        <p>Forgot password?</p>
      </Block>
      <Block>
        <p>
          Don't have an account? <Link to='/'>Sign up</Link>
        </p>
      </Block>
    </Div>
  </Container>
);

export default Signin;
