import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { commentsSelector } from '../../store/selectors';
import { incrementLikes } from '../../store/actions/actionCreators';
import { Figure } from './style';

import LikeAnimation from '../LikeAnimation';

const Photo = ({ post, i, comments, incrementLikes }) => (
  <Figure>
    <div className='grid-photo-wrap'>
      <Link to={`/view/${post.code}`}>
        <img src={post.display_src} alt={post.caption} className='grid-photo' />
      </Link>

      <LikeAnimation likes={post.likes} />
    </div>

    <figcaption data-testid='caption'>
      <p>{post.caption}</p>
      <div className='control-buttons'>
        <button className='likes' onClick={incrementLikes.bind(null, i)}>
          <i className='fa fa-heart' data-testid='likes' /> {post.likes}
        </button>
        <Link to={`/rockstagram/view/${post.code}`} className='button'>
          <span className='comment-count' data-testid='count'>
            <i className='fa fa-comment' />{' '}
            {comments[post.code] ? comments[post.code].length : 0}
          </span>
        </Link>
      </div>
    </figcaption>
  </Figure>
);

const mapStateToProps = state => {
  const comments = commentsSelector(state);

  return {
    comments,
  };
};

export default connect(
  mapStateToProps,
  { incrementLikes },
)(Photo);
