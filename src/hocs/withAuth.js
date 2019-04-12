import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authUser } from '../store/actions/auth';

export default function withAuth(ComponentToProtect) {
  class Auth extends React.Component {
    componentDidMount() {
      //this.props.authUser();
      console.log('saga injectors');
    }

    render() {
      console.log('props', this.props);
      const { loading, redirect } = this.props.auth;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to='/signup' />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    auth: state.authUser,
  });

  return connect(
    mapStateToProps,
    { authUser },
  )(Auth);
}
