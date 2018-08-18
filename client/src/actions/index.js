import _ from 'lodash';
import axios from 'axios';
import { BASE_URI, mapToArray } from '../utils';

export const FETCH_USER = 'fetch_user';
export const FETCH_EVENTS = 'fetch_events';
export const CLEAR_EVENTS = 'clear_events';
export const EVENTS_REQUEST_FAILED = 'event_request_failed';
export const FETCH_PROFILE = 'fetch_profile';
export const UPDATE_PROFILE = 'update_profile';
export const PROFILE_REQUEST_FAILED = 'profile_request_failed';
export const FETCH_RULES = 'fetch_rules';
export const FETCH_RULE = 'fetch_rule';
export const DELETE_RULE = 'delete_rule';
export const CREATE_RULE = 'create_rule';
export const RULES_REQUEST_FAILED = 'rules_request_failed';
export const FETCH_POLICY = 'fetch_policy';
export const POLICY_REQUEST_FAILED = 'plicy_request_failed';

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
      type: EVENTS_REQUEST_FAILED,
      payload: error.response.data || error,
    });
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
      type: PROFILE_REQUEST_FAILED,
      payload: error.response.data || error,
    });
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
      type: PROFILE_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};

export const fetchRules = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URI}/rules`);
    dispatch({
      type: FETCH_RULES,
      payload: _.mapKeys(response.data, 'ruleId'),
    });
  } catch (error) {
    dispatch({
      type: RULES_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};

export const fetchRule = id => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URI}/rules/${id}`);
    dispatch({
      type: FETCH_RULE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: RULES_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};

export const deleteRule = (id, callback) => async dispatch => {
  try {
    await axios.delete(`${BASE_URI}/rules/${id}`);
    callback();

    return {
      type: DELETE_RULE,
      payload: id,
    };
  } catch (error) {
    dispatch({
      type: RULES_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};

export const createRule = (values, callback) => async dispatch => {
  try {
    const response = await axios.post(`${BASE_URI}/rules`, values);
    callback();

    return {
      type: CREATE_RULE,
      payload: response.data,
    };
  } catch (error) {
    dispatch({
      type: RULES_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};

export const fetchPolicy = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URI}/policy`);
    dispatch({
      type: FETCH_POLICY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POLICY_REQUEST_FAILED,
      payload: error.response.data || error,
    });
  }
};
