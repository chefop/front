import {
  phasedActionTypes,
  phasedActionCreators,
} from '../../../utils/actionsHelper';

// Action types
export const ADD_MAIN_COURSE = phasedActionTypes('main/ADD_MAIN_COURSE');
export const FETCH_MAIN_COURSE = phasedActionTypes('main/FETCH_MAIN_COURSE');
export const FETCH_MAIN_COURSES = phasedActionTypes('main/FETCH_MAIN_COURSES');
export const UPDATE_MAIN_COURSE = phasedActionTypes('main/UPDATE_MAIN_COURSE');
export const DELETE_MAIN_COURSE = phasedActionTypes('main/DELETE_MAIN_COURSE');

// Action creators
export const addMainCourse = phasedActionCreators(ADD_MAIN_COURSE);
export const fetchMainCourses = phasedActionCreators(FETCH_MAIN_COURSES);
export const fetchMainCourse = phasedActionCreators(FETCH_MAIN_COURSE);
export const updateMainCourse = phasedActionCreators(UPDATE_MAIN_COURSE);
export const deleteMainCourse = phasedActionCreators(DELETE_MAIN_COURSE);

// Initial State
const initialState = {
  mainCourses: [
    {
      name: 'Steak frites 🥩🍟',
      description: 'Un steak avec des frites',
      dfPrice: 14,
      VAT: 0.2,
      quantity: 25,
      allergen: ['9084090324', '8798320480234'],
      photo:
        'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg',
      _id: '87982898094923',
    },
    {
      name: 'Tartiflette 🧀',
      description: 'Du fromage à la patate avec des lardons, genre beaucoup.',
      dfPrice: 17,
      VAT: 0.2,
      quantity: 0,
      allergen: [],
      photo:
        'https://image.afcdn.com/recipe/20160401/38946_w1024h768c1cx2690cy1793.jpg',
      _id: '90809832769787298427467072',
    },

    {
      name: 'Bœuf bourgignon 🥟',
      description: "Comme l'indique l'emoji, c'est un sauté de canard laqué",
      dfPrice: 15.5,
      VAT: 0.2,
      quantity: 2,
      allergen: ['89173987408293'],
      photo:
        'https://static.cuisineaz.com/610x610/i94631-boeuf-bourguignon.jpg',
      _id: '90840932834234',
    },
  ],
  error: {},
};

// Reducer
const mainCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MAIN_COURSE.success:
    case FETCH_MAIN_COURSE.success:
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
    case FETCH_MAIN_COURSE.failure:
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
