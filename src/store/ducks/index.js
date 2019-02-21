import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

// Reducers
import mainCourseReducer from './mainCourses';
import allergenReducer from './allergens';
import dessertReducer from './desserts';
import starterReducer from './starters';
import volumeReducer from './volumes';
import drinkReducer from './drinks';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    mainCourse: mainCourseReducer,
    allergen: allergenReducer,
    starter: starterReducer,
    dessert: dessertReducer,
    volume: volumeReducer,
    drink: drinkReducer,
  });

export default reducers;
