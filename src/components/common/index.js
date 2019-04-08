import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Block = styled.div`
  border: 2px solid ${props => props.theme.colors.grey};
  box-shadow: 0px 8px 21px -13px rgba(0, 0, 0, 0.48);
  text-align: center;
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.fonts.header};
  font-size: 6.5rem;
`;

export const Button = styled.button`
  width: 320px;
  height: 4rem;
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.offwhite};
  border: none;
  border-radius: 5px;
  font-weight: bold;
`;

export const Text = styled.p`
  color: ${props => props.theme.colors.red};
`;
