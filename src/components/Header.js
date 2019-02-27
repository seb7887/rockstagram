import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles/HeaderStyles';

class Header extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Container>
        <h1>
          <Link to='/'>
            Rockstagram
          </Link>
        </h1>
      </Container>
    );
  }
}

export default Header;