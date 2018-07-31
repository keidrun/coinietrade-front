import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  profile: profileReducer
});

export default rootReducer;
