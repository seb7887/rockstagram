import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { loginUser } from '../../store/actions/auth';

import { Button } from '../common';
import Error from '../Error';
import Message from '../Message';

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
  state = {
    redirect: false,
    message: false,
  };

  handleSubmit = values => {
    const user = {
      email: values.email,
      password: values.password,
    };
    this.props.loginUser(user);
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
    const { isPending, success, error } = this.props.login;

    return (
      <>
        {/* Redirect if register is successfull */}
        {redirect && success && <Redirect to='/' />}

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            this.handleSubmit(values);
            resetForm();
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
                Sign{isPending && 'ing'} in
              </Button>
            </StyledForm>
          )}
        </Formik>

        {!isPending && error && <Error error={error} />}

        {!isPending && message && !error && <Message>Welcome Back!</Message>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginUser,
});

export default connect(
  mapStateToProps,
  { loginUser },
)(SigninForm);
