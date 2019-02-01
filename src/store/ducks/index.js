import { combineReducers } from 'redux';

// Reducers
import starterReducer from './starters';
import mainReducer from './mains';

const reducers = combineReducers({
  starter: starterReducer,
  main: mainReducer,
});

export default reducers;
