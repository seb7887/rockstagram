import React from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts';

const Photo = ({ post, i, comments }) => (
  <figure className='grid-figure'>
    <div className='grid-photo-wrap'>
      <Link to={`/view/${post.code}`}>
        <img src={post.display_src} alt={post.caption} className='grid-photo' />
      </Link>
    </div>

    <figcaption>
      <p>{post.caption}</p>
      <div className='control-buttons'>
        <button className='likes'>&hearts; {posts.likes}</button>
        <Link to={`/view/${post.code}`} className='button'>
          <span className='comment-count'>
            <span className='speech-bubble'></span>
            {comments[post.code] ? comments[post.code].length : 0}
          </span>
        </Link>
      </div>
    </figcaption>
  </figure>
)

export default Photo;
