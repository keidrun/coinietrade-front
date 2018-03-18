import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
  user: userReducer,
  events: eventsReducer
});
