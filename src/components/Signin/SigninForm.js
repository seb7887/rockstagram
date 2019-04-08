import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button } from '../common';

export const StyledForm = styled(Form)`
  width: 300px;
  height: 250px;
  margin: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const StyledField = styled(Field)`
  width: 300px;
  height: 4rem;
  padding: 0 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
`;

class SigninForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <StyledField type='email' name='email' placeholder='Your email' />
            <StyledField
              type='password'
              name='password'
              placeholder='Your password'
            />
            <Button type='submit' disabled={isSubmitting}>
              Sign in
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default SigninForm;
