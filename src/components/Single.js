import React from 'react';
import styled from 'styled-components';

import Photo from './Photo';
import Comments from './Comments';

const SinglePhoto = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  background: white;
`;

const Single = (props) => {
  const i = props.posts.findIndex(post => post.code === props.match.params.postId);
  return (
    <SinglePhoto>
      <Photo key={i} i={i} post={props.posts[i]} {...props} />
      <Comments {...props} postId={i} />
    </SinglePhoto>
  );
}

export default Single;