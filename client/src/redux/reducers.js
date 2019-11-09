import { combineReducers } from 'redux'
import {GET_USER_RESULT_REQUEST, GET_USER_RESULT_SUCCESS, GET_USER_RESULT_FAILURE, LOGIN_USER_FAILURE} from './actions'
import { ADD_NEW_USER_POST_REQUEST } from './actions'
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS} from './actions'

const initState = {
  loading: true,
  q: '',
  users: [],
  error: ''
}

const userResultReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_RESULT_REQUEST:
      return {
        ...state,
        loading: true,
        q: action.payload
      };

    case GET_USER_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ""
      };

    case GET_USER_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_USER_POST_REQUEST:
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state
  }
}

const loginUserReducer = (state = {loggedIn: false, loggedInUser: '', loginError: ''}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loggedIn: false
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.payload,
        loginError: ''
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loggedIn: false,
        loggedInUser: null,
        loginError: action.payload
      }
    default: 
      return state
  }
}

const rootReducer = combineReducers({
  getUsers: userResultReducer,
  loginUser: loginUserReducer,
  addUser: addUserReducer
});
export default rootReducer