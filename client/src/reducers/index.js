import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  events: eventsReducer,
  profile: profileReducer,
});

export default rootReducer;
