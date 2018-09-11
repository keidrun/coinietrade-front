import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchEvents, clearEvents } from '../../actions';
import { getPosition, renderErrors } from '../../utils';

import GridEventList from './widgets/GridEventList';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../common/Loading';

const SEARCH_TEXT = 'bitcoin';
const EVENTS_NUM = 6;

const EventWrapper = styled.div`
  margin: 0 auto;
  padding-top: 20px;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: 'wrap';
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
`;

const StyledLoadMore = styled.div`
  :hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

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

  static getDerivedStateFromProps(props, state) {
    if (props.events.hasOwnProperty('events')) {
      return { loading: false };
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
      <StyledLoadMore onClick={this.loadmore}>
        <FlatButton label="More" fullWidth={true} primary={true} />
      </StyledLoadMore>
    ) : null;

  render() {
    const { error } = this.props;

    return (
      <div>
        {error ? renderErrors(error) : null}
        <EventWrapper>
          <h2>Upcoming Events about Bitcoin</h2>
          {this.state.loading ? <Loading /> : null}
          <FlexWrapper>{this.renderEvents(this.props.events)}</FlexWrapper>
          {this.renderLoadMore(this.props.events)}
        </EventWrapper>
      </div>
    );
  }
}

function mapStateToProps({ events, error }) {
  return { events, error };
}

export default connect(
  mapStateToProps,
  { fetchEvents, clearEvents },
)(Events);
