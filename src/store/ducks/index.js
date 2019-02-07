import { combineReducers } from 'redux';

// Reducers
import starterReducer from './starters';
import mainCourseReducer from './mainCourses';
import drinkReducer from './drinks';

const reducers = combineReducers({
  starter: starterReducer,
  mainCourse: mainCourseReducer,
  drink: drinkReducer,
});

export default reducers;
