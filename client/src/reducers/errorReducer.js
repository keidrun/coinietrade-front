import {
  EVENTS_REQUEST_FAILED,
  PROFILE_REQUEST_FAILED,
  POLICY_REQUEST_FAILED,
  RULES_REQUEST_FAILED,
} from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case EVENTS_REQUEST_FAILED:
      return action.payload;
    case PROFILE_REQUEST_FAILED:
      return action.payload;
    case POLICY_REQUEST_FAILED:
      return action.payload;
    case RULES_REQUEST_FAILED:
      return action.payload;
    default:
      return state;
  }
}
