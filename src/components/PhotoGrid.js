import React from 'react';
import styled from 'styled-components';

import Photo from './Photo';

const Grid = styled.div``;

class PhotoGrid extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <Grid>
        {posts.map((post, i) => <Photo {...this.props} key={i} i={i} post={post} />)}
      </Grid>
    );
  }
}

export default PhotoGrid;
