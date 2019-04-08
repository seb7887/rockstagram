import { createGlobalStyle } from 'styled-components';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'billabongregular';
    src: url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.eot');
    src: url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.eot?#iefix')
    format('embedded-opentype'),
    url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.woff')
    format('woff'),
    url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.ttf')
    format('truetype'),
    url('https://cdn.rawgit.com/milktronics/beaglegr.am/master/public/fonts/billabong-webfont.svg#billabongregular')
    format('svg');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-family: ${props => props.theme.fonts.p}, sans-serif;
    font-size: 10px;
    color: ${theme.black};
  }

  body {
    margin: 0;
    padding: 0;
    background: ${theme.lightgrey};
  }

  p {
    font-size: 1.6rem;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: ${props => props.theme.colors.blue};
  }
`;

export default GlobalStyle;
