import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
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
  state = {
    redirect: false,
    message: false,
  };

  handleSubmit = values => {
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    this.props.registerUser(user);
    this.setState({ message: true });
    // Redirect after 3 seconds
    setTimeout(() => {
      this.setState({
        redirect: true,
        message: false,
      });
    }, 3000);
  };

  render() {
    const { redirect, message } = this.state;
    const { isPending, success, error, user } = this.props.signup;

    return (
      <>
        {/* Redirect if register is successfull */}
        {redirect && success && <Redirect to='/login' />}

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
                Sign{isPending && 'ing'} up
              </Button>
            </StyledForm>
          )}
        </Formik>

        {!isPending && error && <Error error={error} />}

        {!isPending && message && !error && (
          <Message>Welcome {user.name}! Redirecting to sign in ...</Message>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.registerUser,
});

export default connect(
  mapStateToProps,
  { registerUser },
)(SignupForm);
