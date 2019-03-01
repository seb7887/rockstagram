import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    font-family: billabong, 'billabongregular';
    text-align: center;
    font-weight: 100;
    font-size: 13rem;
    margin: 2rem 0;
    letter-spacing: -1px;
    text-shadow: 0px 2px 0 rgba(0, 0, 0, 0.11);

    a {
      color: var(--black);
      text-decoration: none;
      transition: all 0.3s;

      &:active {
        opacity: 0.5;
      }
    }
  }
`;
