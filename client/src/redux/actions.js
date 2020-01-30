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
export const GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST'
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS'
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE'
export const GET_USER_FRIENDS_REQUEST = 'GET_USER_FRIENDS_REQUEST'
export const GET_USER_FRIENDS_SUCCESS = 'GET_USER_FRIENDS_SUCCESS'
export const GET_USER_FRIENDS_FAILURE = 'GET_USER_FRIENDS_FAILURE'


function getUserResultRequest(query) {
  return {
    type: GET_USER_RESULT_REQUEST,
    payload: query
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

function addUserSuccess(addUserResult) {
  return {
    type: ADD_NEW_USER_POST_SUCCESS,
    payload: addUserResult
  }
}

function addUserFailure(addUserError) {
  return {
    type: ADD_NEW_USER_POST_FAILURE,
    payload: addUserError
  }
}

function loginUserRequest(email, password) {
  return {
    type: LOGIN_USER_REQUEST,
    payload: {loginusername: email, loginpassword: password}
  }
}

function loginUserSuccess(userid, firstName, lastName) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {uid:userid, fName: firstName, lName: lastName}
  }
}

function loginUserFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error
  }
}

function getUserProfileRequest(userid) {
  return {
    type: GET_USER_PROFILE_REQUEST, 
    payload: userid
  }
}

function getUserProfileSuccess(userDetails) {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: userDetails
  }
}

function getUserProfileFailure(error) {
  return {
    type: GET_USER_PROFILE_FAILURE,
    payload: error
  }
}

function getUserFriendsRequest(userid) {
  return {
    type: GET_USER_FRIENDS_REQUEST,
    payload: userid
  }
}

function getUserFriendsSuccess(friendsDetails) {
  return {
    type: GET_USER_FRIENDS_SUCCESS,
    payload: friendsDetails
  }
}

function getUserFriendsFailure(error) {
  return {
    type: GET_USER_FRIENDS_FAILURE,
    payload: error
  }
}

export const fetchUsers = (query='') => {
  return function (dispatch) {
        if (query === '') {
          dispatch(getUserResultRequest(''));
          axios
            .get(serverURL + "/users")
            .then(response => {
              var res = response.data.result.records;
              var results = []

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
        } else {
          dispatch(getUserResultRequest(query));
          axios
            .get(serverURL + "/query?q=" + query)
            .then(response => {
              var res = response.data.result.records;
              var results = []

              for (var i = 0; i<res.length; i++){
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
              return dispatch(getUserResultFailure(error))
            });
        }
    }
}

export const addUser = (user) => {
  return function (dispatch) {
    dispatch(addUserRequest())
    axios
      .post(serverURL + "/adduser", {data: user})
      .then(response => {
        // console.log("addUser action response: ", response);
        return dispatch(addUserSuccess(response.data));
      })
      .catch(error => {
        console.log("addUser action error response: ", error);
        return dispatch(addUserFailure(error));
      });
  }
}

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserRequest(email, password));
    axios
      .post(serverURL + "/login", { loginusername: email, loginpassword: password })
      .then(response => {
        if (response.data){
          var r = response.data.responseObj;
          return dispatch(loginUserSuccess(r['userid'], r['firstName'], r['lastName']));
        } else {
          return dispatch(loginUserFailure(response.data));
        }
      })
      .catch(error => {
        console.log("login user action error: ", error);
        return dispatch(loginUserFailure(error));
      });
  }
}

export const getUserProfile = (userid) => {
  return function (dispatch) {
    dispatch(getUserProfileRequest(userid));
    axios
      .post(serverURL + '/user', { payload: userid })
      .then(response => {
        var res = response.data.records;
        
        if (res[0]._fields[0].labels[0] === "user") {
          var properties = res[0]._fields[0].properties;
          var userProfileInfo = new Map();
          userProfileInfo['firstName'] = properties.firstName
          userProfileInfo['lastName'] = properties.lastName
          userProfileInfo['email'] = properties.email
          userProfileInfo['githubUrl'] = properties.githubUrl
          userProfileInfo['linkedinUrl'] = properties.linkedinUrl
        }

        var friendsInfo = new Map()
        var languagesInfo = []
        for (var i = 0; i < res.length; i++){
          var r = res[i];
          if (r._fields[1].type === "friendOf") {
            var properties = r._fields[2].properties;
            var friendInfo = new Map()
            friendInfo['firstName'] = properties.firstName;
            friendInfo['lastName'] = properties.lastName;
            friendInfo['email'] = properties.email;
            friendInfo['githubUrl'] = properties.githubUrl;
            friendInfo['linkedinUrl'] = properties.linkedinUrl;
            
            friendsInfo.set(properties.id, friendInfo);
          } else if (r._fields[1].type === "knows") {
            var properties = r._fields[2].properties;
            if (!languagesInfo.includes(properties.name))
              languagesInfo.push(properties.name)
          }
        }

        var userProfileBundle = {
          profileInfo: userProfileInfo,
          friends: friendsInfo,
          languages: languagesInfo
        }
        return dispatch(getUserProfileSuccess(userProfileBundle));
      }).catch(error => {
        console.log("get user profile error: ", error);
        return dispatch(getUserProfileFailure(error));
      });
  }
}

export const getUserFriends = (userid) => {
  return function (dispatch) {
    dispatch(getUserFriendsRequest(userid));
    axios
      .post(serverURL + '/friends', { payload: userid })
      .then(response => {
        var res = response.data
        console.log('res from /friends route - ', res);
        
    })
  }
}