import _ from 'lodash';
import { FETCH_RULES, FETCH_RULE, DELETE_RULE, CREATE_RULE } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_RULES:
      return action.payload;
    case FETCH_RULE:
      return { ...state, [action.payload.ruleId]: action.payload };
    case DELETE_RULE:
      return _.omit(state, action.payload);
    case CREATE_RULE:
      return state;
    default:
      return state;
  }
}
