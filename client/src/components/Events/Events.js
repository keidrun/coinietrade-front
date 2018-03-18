import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions';

const SEARCH_TEXT = 'bitcoin';
const EVENTS_NUM = 5;

const getPosition = options => {
  if (!navigator.geolocation) {
    throw new Error('Unable to get location.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

class Events extends Component {
  state = {
    position: {
      latitude: '',
      longitude: ''
    }
  };

  async componentWillMount() {
    try {
      const position = await getPosition();
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });

      this.props.fetchEvents(
        SEARCH_TEXT,
        this.state.position.latitude,
        this.state.position.longitude,
        0,
        EVENTS_NUM
      );
    } catch (err) {
      this.props.fetchEvents(SEARCH_TEXT, '', '', 0, EVENTS_NUM);
    }
  }

  loadmore = async () => {
    const restartIndex = this.props.events.events.length;
    this.props.fetchEvents(
      SEARCH_TEXT,
      this.state.position.latitude,
      this.state.position.longitude,
      restartIndex,
      EVENTS_NUM,
      this.props.events.events
    );
  };

  render() {
    console.log(this.props.events);
    return (
      <div>
        Events
        <div onClick={this.loadmore}>More</div>
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { events };
}

export default connect(mapStateToProps, { fetchEvents })(Events);
