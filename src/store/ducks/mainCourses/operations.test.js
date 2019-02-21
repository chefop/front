import { fork } from 'redux-saga/effects';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

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

// Workers
import {
  addMainCourseWorker,
  fetchMainCoursesWorker,
  updateMainCourseWorker,
  deleteMainCourseWorker,
} from './operations';

// Watchers
import {
  addMainCourseSaga,
  fetchMainCoursesSaga,
  updateMainCourseSaga,
  deleteMainCourseSaga,
} from './operations';

import * as mainCourseAPI from '../../APICalls/mainCourseAPI';

import mainCourseSagas from './operations';

// WORKERS
describe('addMainCourseWorker', () => {
  it('add a mainCourse', () => {
    const action = {
      payload: {
        name: 'mon nouveau plat',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        mainCourse: { name: 'Mon nouveau plat' },
      },
    };

    return expectSaga(addMainCourseWorker, action)
      .provide([[matchers.call.fn(mainCourseAPI.createMainCourse), fakeRes]])
      .put(addMainCourse.success({ name: 'Mon nouveau plat' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        name: 'Mon nouveau plat',
      },
    };
    const error = new Error('error');

    return expectSaga(addMainCourseWorker, action)
      .provide([
        [matchers.call.fn(mainCourseAPI.createMainCourse), throwError(error)],
      ])
      .put(addMainCourse.failure('error'))

      .run();
  });
});

describe('fetchMainCourseWorker', () => {
  it('fetch mainCourse', () => {
    const fakeRes = {
      status: 200,
      data: {
        mainCourses: { name: 'mes plats' },
      },
    };

    return expectSaga(fetchMainCoursesWorker)
      .provide([[matchers.call.fn(mainCourseAPI.fetchMainCourses), fakeRes]])
      .put(fetchMainCourses.success({ name: 'mes plats' }))

      .run();
  });

  it('and handles errors', () => {
    const error = new Error('error');

    return expectSaga(fetchMainCoursesWorker)
      .provide([
        [matchers.call.fn(mainCourseAPI.fetchMainCourses), throwError(error)],
      ])
      .put(fetchMainCourses.failure('error'))

      .run();
  });
});

describe('updateMainCourseWorker', () => {
  it('update mainCourse', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };

    const fakeRes = {
      status: 200,
      data: {
        mainCourse: action.payload,
      },
    };

    return expectSaga(updateMainCourseWorker, action)
      .provide([[matchers.call.fn(mainCourseAPI.updateMainCourse), fakeRes]])
      .put(updateMainCourse.success({ _id: '12987', name: 'New name' }))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: {
        _id: '12987',
        name: 'New name',
      },
    };
    const error = new Error('error');

    return expectSaga(updateMainCourseWorker, action)
      .provide([
        [matchers.call.fn(mainCourseAPI.updateMainCourse), throwError(error)],
      ])
      .put(updateMainCourse.failure('error'))

      .run();
  });
});

describe('deleteMainCourseWorker', () => {
  it('delete mainCOurse', () => {
    const action = {
      payload: 'mainCourseID',
    };

    const fakeRes = {
      status: 200,
      data: {
        mainCourse: { name: 'plat supprimé', _id: action.payload },
      },
    };

    return expectSaga(deleteMainCourseWorker, action)
      .provide([[matchers.call.fn(mainCourseAPI.deleteMainCourse), fakeRes]])
      .put(deleteMainCourse.success('mainCourseID'))

      .run();
  });

  it('and handles errors', () => {
    const action = {
      payload: 'mainCourseID',
    };
    const error = new Error('error');

    return expectSaga(deleteMainCourseWorker, action)
      .provide([
        [matchers.call.fn(mainCourseAPI.deleteMainCourse), throwError(error)],
      ])
      .put(deleteMainCourse.failure('error'))

      .run();
  });
});

it('should calls the addMainCourseWorker', () => {
  testSaga(addMainCourseSaga)
    .next()
    .takeLatest(ADD_MAIN_COURSE.request, addMainCourseWorker)

    .finish()
    .isDone();
});

it('should calls the fetchMainCourseWorker', () => {
  testSaga(fetchMainCoursesSaga)
    .next()
    .takeLatest(FETCH_MAIN_COURSES.request, fetchMainCoursesWorker)

    .finish()
    .isDone();
});

it('should calls the updateMainCourseWorker', () => {
  testSaga(updateMainCourseSaga)
    .next()
    .takeLatest(UPDATE_MAIN_COURSE.request, updateMainCourseWorker)

    .finish()
    .isDone();
});

it('should calls the deleteMainCourseWorker', () => {
  testSaga(deleteMainCourseSaga)
    .next()
    .takeLatest(DELETE_MAIN_COURSE.request, deleteMainCourseWorker)

    .finish()
    .isDone();
});

it('should calls the mainCourse sagas', () => {
  testSaga(mainCourseSagas)
    .next()
    .all([
      fork(addMainCourseSaga),
      fork(fetchMainCoursesSaga),
      fork(updateMainCourseSaga),
      fork(deleteMainCourseSaga),
    ])

    .finish()
    .isDone();
});
