import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions/actionCreators';
import Page from '../components/Page';
import Single from '../components/Single';

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actionCreators, dispatch);
}

class App extends React.Component {
  render() {
    const { posts, comments } = this.props;
    return (
      <>
        <Switch>
          <Route
            exact
            path='/'
            render={props =>
              <Page
                posts={posts}
                comments={comments}
                {...props}
              />
            }
          />
          <Route
            exact
            path='/view/:postId'
            render={props =>
              <Single
                comments={comments}
                {...props}
              />
            }
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
