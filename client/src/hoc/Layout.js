import React from 'react';
import { injectGlobal } from 'styled-components';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../theme/muiTheme';

import Header from '../components/containers/Header';
import Body from '../components/common/Body';

injectGlobal`
  * {
    color: #000;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
    font-family: 'PT Sans', sans-serif;
    font-weight: 400;
  }

  * h1, h2, h3, h4, h5 {
    margin: 0;
    width: 100%;
    text-align: center;
    font-family: 'Rammetto One', cursive;
    font-weight: 400;
}

  * h1 {
    font-size: 4.5rem;
  }

  * h2 {
    font-size: 4.0rem;
  }

  * h3 {
    font-size: 3.5rem;
  }

  * h4 {
    font-size: 3.0rem;
  }

  * h5 {
    font-size: 2.5rem;
  }

  * p {
    width: 100%;
  }

  * a {
    text-decoration: none;
  }
`;

const Layout = props => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        <Body>{props.children}</Body>
      </div>
    </MuiThemeProvider>
  </div>
);

export default Layout;
