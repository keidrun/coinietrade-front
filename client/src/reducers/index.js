import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  user: userReducer,
  events: eventsReducer,
  profile: profileReducer
});
