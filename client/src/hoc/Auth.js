import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Loading from '../components/common/Loading';

/**
 * Auth check and reload HOC
 * @param {*} ComposedClass every component that needs auth
 * @param {*} shouldComponentReload null -> nothing, false -> reload to Dashboard if logged, true -> reload to Landing if NOT logged
 * @author Keid
 */
export default function(ComposedClass, shouldComponentReload) {
  class AuthCheckAndReload extends Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      this.props.fetchUser();
    }

    static getDerivedStateFromProps(props, state) {
      const isLogged = props.user;

      switch (isLogged) {
        case null: // API not working
          break;
        case false:
          if (shouldComponentReload) {
            props.history.push('/');
          }
          break;
        default:
          if (shouldComponentReload === false) {
            props.history.push('/dashboard');
          }
          break;
      }

      return { loading: false };
    }

    render() {
      if (this.state.loading) {
        return <Loading />;
      }

      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  return connect(
    mapStateToProps,
    { fetchUser },
  )(AuthCheckAndReload);
}
