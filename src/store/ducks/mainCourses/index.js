import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_MAIN_COURSE = phasedActionTypes('main/ADD_MAIN_COURSE');
export const FETCH_MAIN_COURSES = phasedActionTypes('main/FETCH_MAIN_COURSES');
export const UPDATE_MAIN_COURSE = phasedActionTypes('main/UPDATE_MAIN_COURSE');
export const DELETE_MAIN_COURSE = phasedActionTypes('main/DELETE_MAIN_COURSE');

// Action creators
export const addMainCourse = phasedActionCreators(ADD_MAIN_COURSE);
export const fetchMainCourses = phasedActionCreators(FETCH_MAIN_COURSES);
export const updateMainCourse = phasedActionCreators(UPDATE_MAIN_COURSE);
export const deleteMainCourse = phasedActionCreators(DELETE_MAIN_COURSE);

// Initial State
const initialState = {
  mainCourses: [],
  error: {},
};

// Reducer
const mainCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAIN_COURSE.success:
      return {
        ...state,
        mainCourses: [...state.mainCourses, action.payload],
      };
    case FETCH_MAIN_COURSES.success:
      return {
        ...state,
        mainCourses: action.payload,
      };
    case UPDATE_MAIN_COURSE.success:
      return {
        ...state,
        mainCourses: [
          ...state.mainCourses.filter(
            (mainCourse) => mainCourse._id !== action.payload._id,
          ),
          action.payload,
        ],
      };
    case DELETE_MAIN_COURSE.success:
      return {
        ...state,
        mainCourses: [
          ...state.mainCourses.filter(
            (mainCourse) => mainCourse._id !== action.payload,
          ),
        ],
      };
    case ADD_MAIN_COURSE.failure:
    case FETCH_MAIN_COURSES.failure:
    case UPDATE_MAIN_COURSE.failure:
    case DELETE_MAIN_COURSE.failure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mainCourseReducer;
