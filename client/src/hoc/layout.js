import React from 'react';

const Layout = props => (
  <div>
    Header
    <div>{props.children}</div>
    Footer
  </div>
);

export default Layout;
