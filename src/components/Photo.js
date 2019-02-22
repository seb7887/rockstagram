import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const Figure = styled.figure`
  flex-basis: calc(33.33% - 4rem);
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0 2rem 2rem 2rem;
  padding: 2rem;
  border: 1px solid var(--lightgrey);
  background: white;
  box-shadow: 0 0 0 2.5px rgba(0, 0, 0, 0.01);
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
    a {
      border: 2px solid lighten(grey, 90%);
    }
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

  .likes-heart {
    background: url(http://f.cl.ly/items/3Y373q2Q3J3Y1j203n0m/Bitmap-3.png) center no-repeat;
    background-size: contain;
    font-size: 2rem;
    padding: 1rem;
    position: absolute;
    color: var(--black);
    left: 50%;
    top: 50%;
    pointer-events: none;
  }

  .likes {
    padding: 1rem 4rem;
    font-size: 2.5rem;
    background: transparent;
    border: 2px solid lighten(grey, 90%);
    cursor: pointer;
    transition: all 0.2s;

    &:hover, &:focus {
      border-color: var(--black);
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

  .likes-heart {
    opacity: 0;
    transition: all 0.5s;
    transform: translateX(-50%) translateY(-50%) scale(5);
    display: block;
    
    &.like-enter {
      transition: all 0.2s;
      transform: translateX(-50%) translateY(-50%) scale(1);
      opacity: 1;

      &:active {
        transform: translateX(-50%) translateY(-50%) scale(5);
      }
    }

    &.like-leave {
      &:active {
        display: none;
      }
    }
  }
`;

const Photo = ({ post, i, comments }) => (
  <Figure>
    <div className='grid-photo-wrap'>
      <Link to={`/view/${post.code}`}>
        <img src={post.display_src} alt={post.caption} className='grid-photo' />
      </Link>

      <CSSTransition classNames='like' timeout={500}>
        <span key={post.likes} className='likes-heart'>{post.likes}</span>
      </CSSTransition>
    </div>

    <figcaption>
      <p>{post.caption}</p>
      <div className='control-buttons'>
        <button className='likes'>&hearts; {post.likes}</button>
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
