import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import profileReducer from './profileReducer';
import rulesReducer from './rulesRedoucer';
import policyReducer from './policyReducer';

const rootReducer = combineReducers({
  form: formReducer,
  user: userReducer,
  events: eventsReducer,
  profile: profileReducer,
  rules: rulesReducer,
  policy: policyReducer,
});

export default rootReducer;
