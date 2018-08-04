import _ from 'lodash';
import axios from 'axios';
import { BASE_URI } from '../utils/apiVersion';
import { mapToArray } from '../utils/smallFunctions';

export const FETCH_USER = 'fetch_user';
export const FETCH_EVENTS = 'fetch_events';
export const CLEAR_EVENTS = 'clear_events';
export const FETCH_PROFILE = 'fetch_profile';
export const UPDATE_PROFILE = 'update_profile';

export const fetchUser = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URI}/auth`);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER,
      payload: false,
    });
    // dispatch({ type: ERRORS, payload: error.response.data });
  }
};

export const fetchEvents = (
  text = 'bitcoin',
  lat = '',
  lon = '',
  index = 0,
  num = 10,
  list = null,
) => async dispatch => {
  try {
    const response = await axios.get(
      `${BASE_URI}/events?text=${text}&lat=${lat}&lon=${lon}&index=${index}&num=${num}`,
    );
    if (!list) {
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: FETCH_EVENTS,
        payload: {
          total: response.data.total,
          events: [...list, ...response.data.events],
        },
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS,
      payload: {},
    });
    // dispatch({ type: ERRORS, payload: error.response.data });
  }
};

export const clearEvents = () => dispatch => {
  dispatch({
    type: CLEAR_EVENTS,
    payload: {
      total: 0,
      events: [],
    },
  });
};

export const fetchProfile = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URI}/user`);
    const user = response.data;
    const { secrets } = user;
    user.secrets = _.mapKeys(secrets, 'apiProvider');

    dispatch({
      type: FETCH_PROFILE,
      payload: {
        user: user,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE,
      payload: {},
    });
    // dispatch({ type: ERRORS, payload: error.response.data });
  }
};

export const updateProfile = ({ user }) => async dispatch => {
  try {
    const { secrets } = user;
    user.secrets = mapToArray(secrets, 'apiProvider');

    const response = await axios.put(`${BASE_URI}/user`, user);
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        user: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE,
      payload: { user },
    });
    // dispatch({ type: ERRORS, payload: error.response.data });
  }
};
