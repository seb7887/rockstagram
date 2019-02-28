import styled from 'styled-components';

export const Figure = styled.figure`
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
