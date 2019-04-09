import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/actionCreators';
import { currentUserSelector } from '../../store/selectors';

import Page from '../../components/Page';
import Single from '../../components/Single';
import Signin from '../../components/Signin';

import GlobalStyle from '../../shared/GlobalStyle';
import theme from '../../shared/theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Switch>
            <Route exact path='/' render={() => <Page {...this.props} />} />
            <Route
              exact
              path='/login'
              render={() => <Signin {...this.props} />}
            />
            <Route
              exact
              path='/view/:postId'
              render={props => <Single {...this.props} {...props} />}
            />
          </Switch>
        </>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  const currentUser = currentUserSelector(state);
  return {
    posts: state.posts,
    comments: state.comments,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
