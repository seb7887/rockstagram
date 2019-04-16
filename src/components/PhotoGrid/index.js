import React from 'react';
import { connect } from 'react-redux';
import { postsSelector } from '../../store/selectors';

import { Grid } from './style';

import Photo from '../Photo';

class PhotoGrid extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <Grid>
        {posts.map((post, i) => (
          <Photo {...this.props} key={i} i={i} post={post} />
        ))}
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const posts = postsSelector(state);
  return {
    posts,
  };
};

export default connect(mapStateToProps)(PhotoGrid);
