import React from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Animation = styled.div`
  .like {
    opacity: 0;
    transition: all 0.5s;
    transform: translateX(-50%) translateY(-50%) scale(5);
    display: block;
  }

  .like-enter {
    transition: all 0.2s;
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 1;
  }

  .like-enter-active {
    transform: translateX(-50%) translateY(-50%) scale(5);
  }

  .like-exit-active {
    display: none;
  }
`;

const Likes = styled.span`
  background: url(http://f.cl.ly/items/3Y373q2Q3J3Y1j203n0m/Bitmap-3.png) center
    no-repeat;
  background-size: contain;
  font-size: 2rem;
  padding: 1rem;
  position: absolute;
  color: var(--black);
  left: 50%;
  top: 50%;
  pointer-events: none;
`;

const LikeAnimation = ({ likes }) => (
  <Animation>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        classNames='like'
        className='like'
        key={likes}
        timeout={{ enter: 500, exit: 500 }}
      >
        <Likes>{likes}</Likes>
      </CSSTransition>
    </TransitionGroup>
  </Animation>
);

export default LikeAnimation;
