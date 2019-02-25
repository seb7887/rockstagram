import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LikeAnimation from './LikeAnimation';

const Figure = styled.figure`
  flex-basis: calc(33.33% - 4rem);
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid var(--lightgrey);
  background: white;
  box-shadow: 0 0 0 3.5px rgba(0, 0, 0, 0.01);
  position: relative;

  .grid-photo-wrap {
    position: relative;
  }

  .grid-photo {
    width: calc(100% + 4rem);
    margin-left: -2rem;
    margin-top: -2rem;
    max-width: none;
  }

  .control-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .button {
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: none;
    width: 100%;
    display: inline-block;
    line-height: 2;
    text-decoration: none;
    padding: 1rem 4rem;
    text-align: center;
    font-size: 2.5rem;
    color: var(--black);
    transition: all 0.2s;
    box-sizing: padding-box;


    &:hover, &:focus {
      border-color: var(--black);
      opacity: 0.8;
      outline: 0;
    }
  }

  .likes {
    padding: 1rem 4rem;
    font-size: 2.5rem;
    width: 100%;
    background: transparent;
    border: 2px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.2s;

    &:hover, &:focus {
      border-color: var(--black);
      opacity: 0.8;
      outline: 0;
    }
  }

  .comment-count {
    font-size: 2.5rem;
    
    i {
      vertical-align: middle;
    }
  }

  .speech-bubble {
    width: 1.25rem * 1.2
    height: 1.25rem;
    background: var(--black);
    display: inline-block;
    border-radius: 50%;
    position: relative;
  }
`;

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
