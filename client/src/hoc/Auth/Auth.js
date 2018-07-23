import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';

import styles from './Auth.css';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * Auth check and reload HOC
 * @param {*} ComposedClass every component that needs auth
 * @param {*} shouldReload null -> nothing, false -> reload to Dashboard if logged, true -> reload to Landing if NOT logged
 * @author Keid
 */
export default function(ComposedClass, shouldReload) {
  class AuthCheckAndReload extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      this.props.fetchUser();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      const isLogged = nextProps.user;

      switch (isLogged) {
        case null: // API not working
          return;
        case false:
          if (shouldReload) {
            return this.props.history.push('/');
          }
          break;
        default:
          if (shouldReload === false) {
            return this.props.history.push('/dashboard');
          }
          break;
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <div className={styles.loading}>
            <CircularProgress size={180} thickness={10} color="#000000" />
          </div>
        );
      }

      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps({ user }) {
    return { user };
  }

  return connect(mapStateToProps, { fetchUser })(AuthCheckAndReload);
}
