import { combineReducers } from 'redux';

// Reducers
import starterReducer from './starters';
import mainCourseReducer from './mainCourses';
import drinkReducer from './drinks';
import dessertReducer from './desserts';

const reducers = combineReducers({
  starter: starterReducer,
  mainCourse: mainCourseReducer,
  drink: drinkReducer,
  dessert: dessertReducer,
});

export default reducers;
