import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import starterReducer from './starters';
import mainCourseReducer from './mainCourses';
import drinkReducer from './drinks';
import dessertReducer from './desserts';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    starter: starterReducer,
    mainCourse: mainCourseReducer,
    drink: drinkReducer,
    dessert: dessertReducer,
  });

export default reducers;
