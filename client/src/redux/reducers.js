import { combineReducers } from 'redux'
import {GET_USER_RESULT_REQUEST, GET_USER_RESULT_SUCCESS, GET_USER_RESULT_FAILURE} from './actions'
import {ADD_NEW_USER_POST_REQUEST} from './actions'

const initState = {
    loading: true,
    users: [],
    error: ''
}

const userResultReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_RESULT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case GET_USER_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.map(e=>e),
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

const rootReducer = combineReducers({ users: userResultReducer });
export default rootReducer