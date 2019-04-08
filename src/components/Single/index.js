import React from 'react';
import { SinglePhoto } from './style';

import Photo from '../Photo';
import Comments from '../Comments';

const Single = props => {
  const i = props.posts.findIndex(
    post => post.code === props.match.params.postId,
  );
  return (
    <SinglePhoto>
      <Photo key={i} i={i} post={props.posts[i]} {...props} />
      <Comments {...props} postId={i} />
    </SinglePhoto>
  );
};

export default Single;
