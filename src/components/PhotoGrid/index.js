import React from 'react';
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

export default PhotoGrid;
