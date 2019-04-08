import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

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
          <Form>
            <Field type='text' name='name' placeholder='Your name' />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field type='email' name='email' placeholder='Your email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              type='password'
              name='password'
              placeholder='Your password'
            />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type='submit' disabled={isSubmitting}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default SignupForm;
