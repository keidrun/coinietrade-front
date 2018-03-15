import React from 'react';

import customMuiTheme from './muiTheme';
import { white } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Header from '../../components/Header/Header';

import './base.css';

const muiTheme = getMuiTheme(customMuiTheme, {
  appBar: {
    height: 80
  },
  flatButton: {
    buttonFilterColor: white
  }
});

const Layout = props => (
  <div>
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Header />
        <div>{props.children}</div>
      </div>
    </MuiThemeProvider>
  </div>
);

export default Layout;
