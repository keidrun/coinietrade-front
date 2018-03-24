import axios from 'axios';
import {
  FETCH_USER,
  FETCH_EVENTS,
  CLEAR_EVENTS,
  FETCH_PROFILE,
  UPDATE_PROFILE
} from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};

export const fetchEvents = (
  text = 'bitcoin',
  lat = '',
  lon = '',
  index = 0,
  num = 10,
  list = null
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/events?text=${text}&lat=${lat}&lon=${lon}&index=${index}&num=${num}`
    );
    if (!list) {
      dispatch({ type: FETCH_EVENTS, payload: res.data });
    } else {
      dispatch({
        type: FETCH_EVENTS,
        payload: {
          total: res.data.total,
          events: [...list, ...res.data.events]
        }
      });
    }
  } catch (err) {
    dispatch({ type: FETCH_EVENTS, payload: err.error });
  }
};

export const clearEvents = () => dispatch => {
  dispatch({
    type: CLEAR_EVENTS,
    payload: {
      total: 0,
      events: []
    }
  });
};

export const fetchProfile = () => async dispatch => {
  try {
    const resUser = await axios.get('/api/user');
    const resSetting = await axios.get('/api/setting');

    dispatch({
      type: FETCH_PROFILE,
      payload: {
        user: resUser.data,
        setting: { chartSet: resSetting.data.chartSet }
      }
    });
  } catch (err) {
    dispatch({ type: FETCH_PROFILE, payload: err.error });
  }
};

export const updateProfile = profile => async dispatch => {
  try {
    const resUser = await axios.put('/api/user', profile.user);
    let resSetting;
    if (!resUser.data.settingId) {
      resSetting = await axios.post('/api/setting', profile.setting);
    } else {
      resSetting = await axios.put('/api/setting', profile.setting);
    }
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        user: resUser.data,
        setting: resSetting.data
      }
    });
  } catch (err) {
    dispatch({ type: UPDATE_PROFILE, payload: err.error });
  }
};
