import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../actions';

import AppBar from 'material-ui/AppBar';
import Login from './widgets/Login';
import Logged from './widgets/Logged';

const StyledLink = styled(Link)`
  color: white;
  font-size: 5rem;
  font-family: 'Monoton', cursive;
  font-weight: 400;
`;

class Header extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderTitle() {
    const isLoggedin = this.props.user;

    return (
      <StyledLink to={isLoggedin ? '/dashboard' : '/'}>CoinieTrade</StyledLink>
    );
  }

  renderContent() {
    const isLogged = this.props.user;

    switch (isLogged) {
      case null: // API not working
        return;
      case false:
        return <Login />;
      default:
        return <Logged />;
    }
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.renderTitle()}
          iconElementLeft={<div />}
          iconElementRight={this.renderContent()}
        />
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps,
  { fetchUser },
)(Header);
