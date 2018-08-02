import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents, clearEvents } from '../../actions';
import { getPosition } from '../../utils/geoLocation';

import styles from './Event.css';
import GridEventList from './GridList/GridEventList';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const SEARCH_TEXT = 'bitcoin';
const EVENTS_NUM = 6;

class Events extends Component {
  state = {
    loading: true,
    position: {
      latitude: '',
      longitude: '',
    },
  };

  async componentDidMount() {
    try {
      const position = await getPosition();
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });

      this.props.fetchEvents(
        SEARCH_TEXT,
        this.state.position.latitude,
        this.state.position.longitude,
        0,
        EVENTS_NUM,
      );
    } catch (err) {
      this.props.fetchEvents(SEARCH_TEXT, '', '', 0, EVENTS_NUM);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.events.hasOwnProperty('events')) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.props.clearEvents();
  }

  loadmore = async () => {
    const restartIndex = this.props.events.events.length;
    this.props.fetchEvents(
      SEARCH_TEXT,
      this.state.position.latitude,
      this.state.position.longitude,
      restartIndex,
      EVENTS_NUM,
      this.props.events.events,
    );
  };

  renderEvents = events =>
    events.events ? <GridEventList events={events.events} /> : null;

  renderLoadMore = events =>
    events.events &&
    events.events.length > 0 &&
    events.events.length < events.total ? (
      <div className={styles.loadmore} onClick={this.loadmore}>
        <FlatButton label="More" fullWidth={true} primary={true} />
      </div>
    ) : null;

  renderLoading = () => {
    return this.state.loading ? (
      <div className={styles.loading}>
        <CircularProgress size={180} thickness={10} color="#f0f0f0" />
      </div>
    ) : null;
  };

  render() {
    return (
      <div className={styles.event}>
        <h2>Upcoming Events about Bitcoin</h2>
        {this.renderLoading()}
        <div className={styles.flex_wrapper}>
          {this.renderEvents(this.props.events)}
        </div>
        {this.renderLoadMore(this.props.events)}
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { events };
}

export default connect(
  mapStateToProps,
  { fetchEvents, clearEvents },
)(Events);
