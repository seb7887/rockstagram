import React from 'react';
import styled from 'styled-components';

import Photo from './Photo';

const SinglePhoto = styled.div``;

const Single = (props) => {
  console.log(props);
  const i = props.posts.findIndex(post => post.code === props.match.params.postId);
  return (
    <SinglePhoto>
      <Photo key={i} i={i} post={props.posts[i]} {...props} />
    </SinglePhoto>
  );
}

export default Single;