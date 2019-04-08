import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/actionCreators';
import Page from '../../components/Page';
import Single from '../../components/Single';

import GlobalStyle from '../../shared/GlobalStyle';
import theme from '../../shared/theme';

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
};

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
              path='/view/:postId'
              render={props => <Single {...this.props} {...props} />}
            />
          </Switch>
        </>
      </ThemeProvider>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
