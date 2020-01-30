import { combineReducers } from 'redux'
import {GET_USER_RESULT_REQUEST, GET_USER_RESULT_SUCCESS, GET_USER_RESULT_FAILURE, LOGIN_USER_FAILURE} from './actions'
import { ADD_NEW_USER_POST_REQUEST, ADD_NEW_USER_POST_SUCCESS, ADD_NEW_USER_POST_FAILURE } from './actions'
import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS } from './actions'
import { GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE } from './actions'
import { GET_USER_FRIENDS_REQUEST, GET_USER_FRIENDS_SUCCESS, GET_USER_FRIENDS_FAILURE } from './actions'

const initUserResultState = {
  loading: true,
  q: '',
  users: [],
  error: ''
};

const userResultReducer = (state = initUserResultState, action) => {
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
    
    case ADD_NEW_USER_POST_SUCCESS:
      return {
        ...state,
        user: action.payload.addUser,
        newUserid: action.payload.newUserid
      };

    case ADD_NEW_USER_POST_FAILURE:
      return {
        ...state,
        user: null,
        error: "new user couldn't be added successfully. error - " + action.payload
      }
    default:
      return state
  }
};

const loginUserReducer = (state = { loggedIn: false, loggedInUser: '', loginError: '' }, action) => {
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
};

const userProfileReducer = (state = { userid: '', userProfile: [], userProfileError: '' }, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        userid: action.payload
      }
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload
      }
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        userProfileError: action.payload
      }
    default:
      return state
  }
};

const userFriendsReducer = (state = {userid: '', friendsDetails: [], friendsDetailsError: ''}, action) => {
  switch (action.type) {
    case GET_USER_FRIENDS_REQUEST:
      return {
        ...state,
        userid: action.payload
      }
    case GET_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        friendsDetails: action.payload
      }
    case GET_USER_FRIENDS_FAILURE:
      return {
        ...state,
        friendsError: action.payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  getUsers: userResultReducer,
  loginUser: loginUserReducer,
  addUser: addUserReducer,
  getUserProfile: userProfileReducer,
  getUserFriends: userFriendsReducer
});
export default rootReducer