import axios from 'axios'
import {serverURL} from '../Util/ServerConstants'

export const GET_USER_RESULT_REQUEST = 'GET_USER_RESULT_REQUEST'
export const GET_USER_RESULT_SUCCESS = 'GET_USER_RESULT_SUCCESS'
export const GET_USER_RESULT_FAILURE = 'GET_USER_RESULT_FAILURE'
export const ADD_NEW_USER_POST_REQUEST = 'ADD_NEW_USER_POST_REQUEST'

function getUserResultRequest() {
  return {
    type: GET_USER_RESULT_REQUEST
  };
};

function getUserResultSuccess(users) {
  console.log('in getuser result success action. users are '+users)
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
            console.log('in action creator user results: ' + results);
            return dispatch(getUserResultSuccess(results));
          })
          .catch(error => {
              console.log("in action creator error: " + error);
            dispatch(getUserResultFailure(error));
          });
    }
}