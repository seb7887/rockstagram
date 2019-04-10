import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';
import { registerUser } from '../../store/actions/auth';

import { Button, Text } from '../common';
import Error from '../Error';
import Message from '../Message';

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
  handleSubmit = values => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    this.props.registerUser(user);
  };

  render() {
    const { isPending, message, error, user } = this.props.signup;

    return (
      <>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            this.handleSubmit(values);
            resetForm();
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <StyledForm>
              <StyledField type='text' name='name' placeholder='Your name' />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
              <StyledField type='email' name='email' placeholder='Your email' />
              {errors.email && touched.email ? (
                <Text>{errors.email}</Text>
              ) : null}
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

        {!isPending && error && <Error error={error} />}

        {!isPending && message && <Message message={message} />}
      </>
    );
  }
}

const mapStateToProps = response => ({
<<<<<<< HEAD
  signup: response.registerUser,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(SignupForm);
=======
  response,
});

export default connect(mapStateToProps)(SignupForm);
>>>>>>> 7035b4156592a6bb297f0283b0d1bc6cdc8d0b5a
