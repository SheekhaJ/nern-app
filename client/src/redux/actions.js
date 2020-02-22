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
export const ADD_FRIENDS_POST_REQUEST = 'ADD_FRIENDS_POST_REQUEST'
export const ADD_FRIENDS_POST_SUCCESS = 'ADD_FRIENDS_POST_SUCCESS'
export const ADD_FRIENDS_POST_FAILURE = 'ADD_FRIENDS_POST_FAILURE'
export const GET_USER_RATING_REQUEST = 'GET_USER_RATING_REQUEST'
export const GET_USER_RATING_SUCCESS = 'GET_USER_RATING_SUCCESS'
export const GET_USER_RATING_FAILURE = 'GET_USER_RATING_FAILURE'
export const UPDATE_USER_LANG_RATING_REQUEST = 'UPDATE_USER_LANG_RATING_REQUEST'
export const UPDATE_USER_LANG_RATING_SUCCESS = 'UPDATE_USER_LANG_RATING_SUCCESS'
export const UPDATE_USER_LANG_RATING_FAILURE = 'UPDATE_USER_LANG_RATING_FAILURE'

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

function addFriendsRequest(loggedinuserid, selectedfriendsids) {
  return {
    type: ADD_FRIENDS_POST_REQUEST,
    payload: {userid: loggedinuserid, friendsids: selectedfriendsids}
  }
}

function addFriendsSuccess(addFriendsResult) {
  return {
    type: ADD_FRIENDS_POST_SUCCESS, 
    payload: addFriendsResult
  }
}

function addFriendsFailure(addFriendsError) {
  return {
    type: ADD_FRIENDS_POST_FAILURE, 
    payload: addFriendsError
  }
}

function getUserRatingRequest(loggeduserid, selectedprofileuserid) {
  return {
    type: GET_USER_RATING_REQUEST,
    payload: {loggedinuserid: loggeduserid, profileuserid: selectedprofileuserid}
  }
}

function getUserRatingSuccess(getUserRatingResult) {
  return {
    type: GET_USER_RATING_SUCCESS,
    payload: getUserRatingResult
  }
}

function getUserRatingError(getUserRatingError) {
  return {
    type: GET_USER_RATING_FAILURE,
    payload: getUserRatingError
  }
}

function updateUserLangRatingRequest(lang, newRating) {
  return {
    type: UPDATE_USER_LANG_RATING_REQUEST,
    payload: {language: lang, updatedRating: newRating}
  }
}

function updateUserLangRatingSuccess(lang, newRating) {
  return {
    type: UPDATE_USER_LANG_RATING_SUCCESS,
    payload: {language: lang, updatedRating: newRating}
  }
}

function updateUserLangRatingFailure(lang, sentRating) {
  return {
    type: UPDATE_USER_LANG_RATING_FAILURE,
    payload: {language: lang, failedRating: sentRating}
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
        var res = response.data['result']
        // console.log('response from getuserprofile - ', res);

        var userProfileInfo = new Map(), languagesInfo = new Map(), friendsInfo = new Map();
        
        if (res['userProfile'].records[0]._fields[0].labels == 'user') {
          userProfileInfo['firstName'] = res['userProfile'].records[0]._fields[0].properties['firstName'];
          userProfileInfo['lastName'] = res['userProfile'].records[0]._fields[0].properties['lastName'];
          userProfileInfo['email'] = res['userProfile'].records[0]._fields[0].properties['email'];
          userProfileInfo['githubUrl'] = res['userProfile'].records[0]._fields[0].properties['githubUrl'];
          userProfileInfo['linkedinUrl'] = res['userProfile'].records[0]._fields[0].properties['linkedinUrl'];
        }

        if (res['languages'].records[0].length > 0) {
          var tempRecords1 = res['languages'].records
          tempRecords1.forEach(tempRecord => {
            if (tempRecord._fields[1].type == 'knows') {
              languagesInfo[tempRecord._fields[2].properties['id']] = tempRecord._fields[2].properties['name']
            }
          });
        }

        if (res['friends'].records[0].length > 0) {
          var tempRecords2 = res['friends'].records
          
          tempRecords2.forEach(tempRecord => {
            var friendInfo = new Map();
            if (tempRecord._fields[1].type == 'friendOf' && tempRecord._fields[2].labels == 'user') {
              friendInfo['firstName'] = tempRecord._fields[2].properties['firstName'];
              friendInfo['lastName'] = tempRecord._fields[2].properties['lastName']
              friendInfo['email'] = tempRecord._fields[2].properties['email'];
              friendInfo['githubUrl'] = tempRecord._fields[2].properties['githubUrl']
              friendInfo['linkedinUrl'] = tempRecord._fields[2].properties['linkedinUrl'];

              friendsInfo.set(tempRecord._fields[2].properties['id'], friendInfo);
            }
          })
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
        // console.log('res from /friends route - ', response);
        var res = response.data.result.records;
        var friends = []

        for (var i = 0; i < res.length; i++){
          friends.push(res[i]._fields[0].properties);
        }
        // console.log(friends);

        return dispatch(getUserFriendsSuccess(friends));
      }).catch(error => {
        console.log("get user's friends error - ", error);
        return dispatch(getUserFriendsFailure(error));
    })
  }
}

export const addUserFriends = (loggedinuserid, selectedfriendsids) => {
  return function (dispatch) {
    dispatch(addFriendsRequest(loggedinuserid, selectedfriendsids));
    var dispatchResponses = [];
    
    for (var i = 0; i < selectedfriendsids.length; i++){
      var selectedfriendid = selectedfriendsids[i];
      axios.post(serverURL + "/addfriends", { userid: loggedinuserid, friendsids: selectedfriendid })
        .then(response => {
          if (response.data) {
            console.log('response from backend - ', response.data);
            dispatchResponses.push(response.data);
            // return dispatch(addFriendsSuccess(response.data));
          } else {
            return dispatch(addFriendsFailure({ 'error while adding friends': response }))
          }
        })
        .catch(error => {
          console.log("add friends error - ", error);
          return dispatch(addFriendsFailure({ 'error while adding friends': error }))
        })
    }
    return dispatch(addFriendsSuccess(dispatchResponses))
    
  }
}

export const getUserRatings = (loggeduserid, selectedprofileuserid) => {
  return function (dispatch) {
    var ratings = new Map()
    dispatch(getUserRatingRequest(loggeduserid, selectedprofileuserid))
    axios.post(serverURL + '/getuserratings', { loggedinuserid: loggeduserid, profileuserid: selectedprofileuserid })
      .then(response => {
        console.log('/getuserrating response - ', response.data['result']);
        var res = response.data['result']

        if (res.records) {
          var temp = res.records[0]._fields[1].properties;
          // console.log('temp is ', temp)
          Object.entries(temp).forEach(entry => {
            ratings[entry[0]] = entry[1]
          })
        }
        
        return dispatch(getUserRatingSuccess(ratings));
      }).catch(error => {
        console.log('/getuserrating error - ', error);
        return dispatch(getUserRatingError(error));
    })
  }
}

export const updateUserRatings = (lang, rating) => {
  return function (dispatch) {
    dispatch(updateUserLangRatingRequest(lang, rating));
    axios.post(serverURL + '/updateuserratings', { language: lang, updatedRating: rating })
      .then(response => {
        console.log('/updateuserrating response - ', response.data)
        return dispatch(updateUserLangRatingSuccess(response.data));
      }).catch(error => {
        console.log('/updateuserrating error - ', error);
        return dispatch(updateUserLangRatingFailure(error));
    })
  }
}