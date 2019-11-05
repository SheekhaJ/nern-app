import axios from 'axios'
import {serverURL} from '../Util/ServerConstants'

export const GET_USER_RESULT_REQUEST = 'GET_USER_RESULT_REQUEST'
export const GET_USER_RESULT_SUCCESS = 'GET_USER_RESULT_SUCCESS'
export const GET_USER_RESULT_FAILURE = 'GET_USER_RESULT_FAILURE'
export const ADD_NEW_USER_POST_REQUEST = 'ADD_NEW_USER_POST_REQUEST'
export const ADD_NEW_USER_POST_SUCCESS = "ADD_NEW_USER_POST_SUCCESS"
export const ADD_NEW_USER_POST_FAILURE = "ADD_NEW_USER_POST_FAILURE"
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

function getUserResultRequest() {
  return {
    type: GET_USER_RESULT_REQUEST
  };
};

function getUserResultSuccess(users) {
  return {
    type: GET_USER_RESULT_SUCCESS,
    payload: users
  };
};

function getUserResultFailure(error) {
  return {
    type: GET_USER_RESULT_FAILURE,
    payload: error
  };
};

function addUserRequest(user) {
  return {
    type: ADD_NEW_USER_POST_REQUEST,
    payload: user
  }
}

function addUserSuccess() {
  return {
    type: ADD_NEW_USER_POST_SUCCESS
  }
}

function addUserFailure() {
  return {
    type: ADD_NEW_USER_POST_FAILURE
  }
}

function loginUserRequest(email) {
  return {
    type: LOGIN_USER_REQUEST,
    payload: email
  }
}

function loginUserSuccess(firstName, lastName) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {fName: firstName, lName: lastName}
  }
}

function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error
  }
}

export const fetchUsers = () => {
  return function (dispatch) {
        dispatch(getUserResultRequest());
        axios
          .get(serverURL + "/users")
          .then(response => {
            var res = response.data.result.records;
            var results = new Array();

            for (var i = 0; i < res.length; i++) {
              var r = res[i];
              const id = r._fields[0];
              const firstName = r._fields[1];
              const lastName = r._fields[2];
              const email = r._fields[3];
              const githubUrl = r._fields[4];
              const linkedinUrl = r._fields[5];
              results.push([
                id,
                firstName,
                lastName,
                email,
                githubUrl,
                linkedinUrl
              ]);
            }
            return dispatch(getUserResultSuccess(results));
          })
          .catch(error => {
            return dispatch(getUserResultFailure(error));
          });
    }
}

export const addUser = (user) => {
  return function (dispatch) {
    dispatch(addUserRequest())
    axios
      .post(serverURL + "/adduser", {data: user})
      .then(response => {
        console.log("addUser action response: ", response);
        return dispatch(addUserSuccess(response.status));
      })
      .catch(error => {
        console.log("addUser action error response: ", error);
        return dispatch(addUserFailure(error));
      });
  }
}

export const loginUser = (email) => {
  return function (dispatch) {
    dispatch(loginUserRequest(email));
    axios
      .post(serverURL + "/login", { payload: email })
      .then(response => {
        var r = response.data.records[0];
        // var fullName =  + " " + ;
        return dispatch(loginUserSuccess(r._fields[1], r._fields[2]));
      })
      .catch(error => {
        console.log("login user action error: ", error);
        return dispatch(loginUserFailure(error));
      });
  }
}