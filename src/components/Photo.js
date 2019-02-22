import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import posts from '../data/posts';

const Figure = styled.figure`
  flex-basis: calc(33.33% - 4rem);
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid var(--lightgrey);
  background: white;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.01);
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
  }

  .button {
    border: 2px solid lighten(grey, 90%);
    background: none;
    flex-basis: 48%;
    display: inline-block;
    line-height: 2;
    text-decoration: none;
    padding: 5px;
    text-align: center;
    font-size: 15px;
    color: var(--black);
    transition: all 0.2s;
    box-sizing: padding-box;

    &:hover, &:focus {
      border-color: var(--black);
      outline: 0;
    }
  }

  .comment-count {

  }

  .speech-bubble {
    width: 1.25rem * 1.2
    height: 1.25rem;
    background: var(--black);
    display: inline-block;
    border-radius: 50%;
    position: relative;

    &:after {
      display: inline-block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 1.25rem 1.25rem 0;
      border-color: transparent var(--black) transparent transparent;
      top: 30%;
      left: 0;
    }
  }
`;

const Photo = ({ post, i, comments }) => (
  <Figure>
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
  </Figure>
)

export default Photo;
