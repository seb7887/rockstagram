import React from 'react';
import { Link } from 'react-router-dom';
import { Figure } from './styles/PhotoStyles';

import LikeAnimation from './LikeAnimation';

const Photo = ({ post, i, comments, incrementLikes }) => (
  <Figure>
    <div className='grid-photo-wrap'>
      <Link to={`/view/${post.code}`}>
        <img src={post.display_src} alt={post.caption} className='grid-photo' />
      </Link>

      <LikeAnimation likes={post.likes} />
    </div>

    <figcaption>
      <p>{post.caption}</p>
      <div className='control-buttons'>
        <button className='likes' onClick={incrementLikes.bind(null, i)}><i className='fa fa-heart' /> {post.likes}</button>
        <Link to={`/view/${post.code}`} className='button'>
          <span className='comment-count'>
            <i className='fa fa-comment' /> {comments[post.code] ? comments[post.code].length : 0}
          </span>
        </Link>
      </div>
    </figcaption>
  </Figure>
)

export default Photo;
