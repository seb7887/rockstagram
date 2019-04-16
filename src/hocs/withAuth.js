import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authUser } from '../store/actions/auth';

//import { authService } from '../services';

export default function withAuth(ComponentToProtect) {
  class Auth extends React.Component {
    state = {
      loading: true,
      redirect: false,
    };

    componentDidMount = async () => {
      this.props.authUser();
      // const res = await authService();
      // if (res.status === 200) {
      //   this.setState({ loading: false });
      // } else {
      //   this.setState({ loading: false, redirect: true });
      // }
    };

    render() {
      //const { loading, redirect } = this.state;
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
