import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, Text } from '../common';

export const StyledForm = styled(Form)`
  width: 300px;
  height: 300px;
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

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(22, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too short!')
    .max(12, 'Too long!')
    .required('Required'),
});

class SignupForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <StyledForm>
            <StyledField type='text' name='name' placeholder='Your name' />
            {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
            <StyledField type='email' name='email' placeholder='Your email' />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            <StyledField
              type='password'
              name='password'
              placeholder='Your password'
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <Button type='submit' disabled={isSubmitting}>
              Sign up
            </Button>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default SignupForm;
