import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontAwesome from 'react-fontawesome';

import { BASE_URI } from '../../../utils';

const StyledLink = styled(Link)`
  span {
    color: #f50057;
    font-size: 2rem;
  }
`;

const StyledAnchorLink = styled.a`
  span {
    color: #f50057;
    font-size: 2rem;
  }
`;

class Logged extends Component {
  static muiName = 'IconMenu';

  renderMenu() {
    const menuItems = [
      {
        icon: 'home',
        text: 'Dashboard',
        link: '/dashboard',
      },
      {
        icon: 'exchange',
        text: 'Trade Rules',
        link: '/rules',
      },
      {
        icon: 'meetup',
        text: 'Events',
        link: '/meetup',
      },
      {
        icon: 'cog',
        text: 'Settings',
        link: '/settings',
      },
      {
        icon: 'info-circle',
        text: 'Help',
        link: '/help',
      },
    ];

    return menuItems.map((item, i) => {
      return (
        <div key={i}>
          <StyledLink to={item.link}>
            <MenuItem
              primaryText={
                <span>
                  <FontAwesome name={item.icon} /> {item.text}
                </span>
              }
            />
          </StyledLink>
        </div>
      );
    });
  }

  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {this.renderMenu()}
        <MenuItem
          primaryText={
            <StyledAnchorLink href={`${BASE_URI}/auth/logout`}>
              <span>
                <FontAwesome name="sign-out" /> Sign out
              </span>
            </StyledAnchorLink>
          }
        />
      </IconMenu>
    );
  }
}

export default Logged;
