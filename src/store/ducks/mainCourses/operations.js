import { call, fork, put, takeLatest, all } from 'redux-saga/effects';

// Import action types
import {
  ADD_MAIN_COURSE,
  FETCH_MAIN_COURSES,
  UPDATE_MAIN_COURSE,
  DELETE_MAIN_COURSE,
} from '.';

// Import action Creators
import {
  addMainCourse,
  fetchMainCourses,
  updateMainCourse,
  deleteMainCourse,
} from '.';

import * as mainCourseAPI from '../../APICalls/mainCourseAPI';

// WORKERS
export function* addMainCourseWorker(action) {
  try {
    const mainCourse = action.payload;
    const res = yield call(mainCourseAPI.createMainCourse, mainCourse);
    if (res.status === 200) {
      const mainCourse = res.data.mainCourse;
      yield put(addMainCourse.success(mainCourse));
    }
  } catch (err) {
    yield put(addMainCourse.failure(err.message));
  }
}

export function* fetchMainCoursesWorker() {
  try {
    const res = yield call(mainCourseAPI.fetchMainCourses);
    if (res.status === 200) {
      const mainCourses = res.data.mainCourses;
      yield put(fetchMainCourses.success(mainCourses));
    }
  } catch (err) {
    yield put(fetchMainCourses.failure(err.message));
  }
}

export function* updateMainCourseWorker(action) {
  try {
    const mainCourse = action.payload;
    const res = yield call(mainCourseAPI.updateMainCourse, mainCourse);
    if (res.status === 200) {
      const mainCourse = res.data.mainCourse;
      yield put(updateMainCourse.success(mainCourse));
    }
  } catch (err) {
    yield put(updateMainCourse.failure(err.message));
  }
}

export function* deleteMainCourseWorker(action) {
  try {
    const mainCourseId = action.payload;
    const res = yield call(mainCourseAPI.deleteMainCourse, mainCourseId);
    if (res.status === 200) {
      const mainCourse = res.data.mainCourse;
      yield put(deleteMainCourse.success(mainCourse._id));
    }
  } catch (err) {
    yield put(deleteMainCourse.failure(err.message));
  }
}

// WATCHERS
export function* addMainCourseSaga() {
  yield takeLatest(ADD_MAIN_COURSE.request, addMainCourseWorker);
}

export function* fetchMainCoursesSaga() {
  yield takeLatest(FETCH_MAIN_COURSES.request, fetchMainCoursesWorker);
}

export function* updateMainCourseSaga() {
  yield takeLatest(UPDATE_MAIN_COURSE.request, updateMainCourseWorker);
}

export function* deleteMainCourseSaga() {
  yield takeLatest(DELETE_MAIN_COURSE.request, deleteMainCourseWorker);
}

// Export watchers
export default function* mainCourseSagas() {
  yield all([
    fork(addMainCourseSaga),
    fork(fetchMainCoursesSaga),
    fork(updateMainCourseSaga),
    fork(deleteMainCourseSaga),
  ]);
}
