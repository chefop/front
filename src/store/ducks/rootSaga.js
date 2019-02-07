import { all, fork } from 'redux-saga/effects';

// Import all sagas
import starterSaga from './starters/operations';
import mainCourseSaga from './mainCourses/operations';
import drinkSaga from './drinks/operations';
import dessertSaga from './desserts/operations';

export default function* rootSaga() {
  yield all(
    [fork(starterSaga)],
    [fork(mainCourseSaga)],
    [fork(drinkSaga)],
    [fork(dessertSaga)],
  );
}
