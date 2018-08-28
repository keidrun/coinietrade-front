import React, { Component } from 'react';
import styled from 'styled-components';

import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';

const StyledAnchorLink = styled.a`
  color: white;
  font-size: 2rem;

  span {
    color: white;
    font-size: 2rem;
  }
`;

class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <div>
        <FlatButton
          {...this.props}
          label={
            <span>
              <StyledAnchorLink href="/auth/facebook">
                <FontAwesome name="fab fa-facebook" /> Login
              </StyledAnchorLink>
            </span>
          }
        />

        <FlatButton
          {...this.props}
          label={
            <span>
              <StyledAnchorLink href="/auth/google">
                <FontAwesome name="fab fa-google" /> Login
              </StyledAnchorLink>
            </span>
          }
        />
      </div>
    );
  }
}

export default Login;
