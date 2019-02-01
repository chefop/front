import { combineReducers } from 'redux';

// Reducers
import starterReducer from './starters';
import mainCourseReducer from './mainCourses';

const reducers = combineReducers({
  starter: starterReducer,
  mainCourse: mainCourseReducer,
});

export default reducers;
