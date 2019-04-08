import styled from 'styled-components';

export const LoadableImage = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  transition: filter 1s ease;
  filter: ${props => (!props.loaded ? 'blur(3px)' : 'unset')};
  background-image: url(${props => props.src});
  background-position: 50% 50%;
  background-origin: border-box;
  background-size: cover;
`;
