import { FETCH_EVENTS, CLEAR_EVENTS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.payload;
    case CLEAR_EVENTS:
      return action.payload;
    default:
      return state;
  }
}
