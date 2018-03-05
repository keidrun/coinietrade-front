import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_USER, payload: false });
  }
};
