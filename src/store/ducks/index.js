import { combineReducers } from 'redux';

// Reducers
import starterReducer from './starters';

const reducers = combineReducers({
  starter: starterReducer,
});

export default reducers;
