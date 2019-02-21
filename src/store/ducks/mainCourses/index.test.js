// Reducer
import mainCourseReducer from '.';

// Action creators
import {
  addMainCourse,
  fetchMainCourses,
  updateMainCourse,
  deleteMainCourse,
} from '.';

const initialState = {
  mainCourses: [],
  error: {},
};

describe('MainCourse reducer', () => {
  it('should return the initial state', () => {
    expect(mainCourseReducer(initialState, {})).toEqual({
      mainCourses: [],
      error: {},
    });
  });

  it('should handle addMainCourse.success', () => {
    expect(
      mainCourseReducer(
        initialState,
        addMainCourse.success({ name: 'mon plat' }),
      ),
    ).toEqual({
      mainCourses: [{ name: 'mon plat' }],
      error: {},
    });
  });

  it('should handle fetchMainCourse.success', () => {
    expect(
      mainCourseReducer(
        initialState,
        fetchMainCourses.success([{ name: 'mon plat' }]),
      ),
    ).toEqual({
      mainCourses: [{ name: 'mon plat' }],
      error: {},
    });
  });

  it('should handle updateMainCourse.success', () => {
    const initialState = {
      mainCourses: [{ _id: 'idMainCourse', name: 'mon plat' }],
      error: {},
    };
    expect(
      mainCourseReducer(
        initialState,
        updateMainCourse.success({ _id: 'idMainCourse', name: 'nouveau nom' }),
      ),
    ).toEqual({
      mainCourses: [{ _id: 'idMainCourse', name: 'nouveau nom' }],
      error: {},
    });
  });

  it('should handle deleteMainCourse.success', () => {
    const initialState = {
      mainCourses: [{ _id: 'idMainCourse' }, { _id: 'idMainCourse2' }],
      error: {},
    };
    expect(
      mainCourseReducer(initialState, deleteMainCourse.success('idMainCourse')),
    ).toEqual({
      mainCourses: [{ _id: 'idMainCourse2' }],
      error: {},
    });
  });

  it('should handle errors', () => {
    expect(
      mainCourseReducer(initialState, addMainCourse.failure('error message')),
    ).toEqual({
      mainCourses: [],
      error: 'error message',
    });
  });
});
