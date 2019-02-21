import { all, fork } from 'redux-saga/effects';

// Import all sagas
import mainCourseSaga from './mainCourses/operations';
import allergenSaga from './allergens/operations';
import starterSaga from './starters/operations';
import dessertSaga from './desserts/operations';
import drinkSaga from './drinks/operations';

export default function* rootSaga() {
  yield all(
    [fork(mainCourseSaga)],
    [fork(allergenSaga)],
    [fork(starterSaga)],
    [fork(dessertSaga)],
    [fork(drinkSaga)],
  );
}
