import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { getUserProfile } from "../../redux/actions";
import Profile from '../Profile';


function ProfileSurface(props) {
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  
  useEffect(() => {
    props.getUserProfile(props.profileid);
  }, [])

  const handleProfileClick = (profileidfromclick) => {
    console.log('profileid from click - ',profileidfromclick)
    props.getUserProfile(profileidfromclick)
  }

  return (
    <div>
      {
        props.userProfileInfo && props.friendsInfo && props.languageInfo && 
        <Profile userprofileid={userprofileid} userProfile={props.userProfileInfo} friends={props.friendsInfo} languages={props.languageInfo}
          usergridProfileIdCallback = {handleProfileClick}></Profile>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userProfileInfo: state.getUserProfile.userProfile.profileInfo,
    friendsInfo: state.getUserProfile.userProfile.friends,
    languageInfo: state.getUserProfile.userProfile.languages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: (userid) => dispatch(getUserProfile(userid))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSurface)
