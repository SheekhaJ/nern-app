import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { getUserProfile, getUserRatings } from "../../redux/actions";
import Profile from '../Profile';


function ProfileSurface(props) {
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  
  useEffect(() => {
    props.getUserProfile(props.profileid);
  }, [])

  useEffect(() => {
    if (props.userProfileInfo != []) {
      setTimeout(() => {
        props.getUserRatings(localStorage.getItem('eruid'), userprofileid);
      }, 300)
    }
  }, [props.userProfileInfo])

  const handleProfileClick = (profileidfromclick) => {
    console.log('profileid from click - ',profileidfromclick)
    props.getUserProfile(profileidfromclick)
  }

  return (
    <div>
      {
        props.userProfileInfo && props.friendsInfo && props.languageInfo && props.ratingsInfo && 
        <Profile userprofileid={userprofileid} userProfile={props.userProfileInfo} friends={props.friendsInfo} languages={props.languageInfo}
          usergridProfileIdCallback = {handleProfileClick} ratings={props.ratingsInfo}></Profile>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfileInfo: state.getUserProfile.userProfile.profileInfo,
    friendsInfo: state.getUserProfile.userProfile.friends,
    languageInfo: state.getUserProfile.userProfile.languages,
    ratingsInfo: state.getUserRatings.ratings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: (userid) => dispatch(getUserProfile(userid)),
    getUserRatings: (loggedinuserid, selectedprofileuserid) => dispatch(getUserRatings(loggedinuserid, selectedprofileuserid))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSurface)
