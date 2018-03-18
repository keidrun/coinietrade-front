import axios from 'axios';
import { FETCH_USER, FETCH_EVENTS } from './types';

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
    dispatch({ type: FETCH_EVENTS, payload: err });
  }
};
