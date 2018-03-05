import React from 'react';

import { cyan500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '../components/Header/Header';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});

const Layout = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  </MuiThemeProvider>
);

export default Layout;
