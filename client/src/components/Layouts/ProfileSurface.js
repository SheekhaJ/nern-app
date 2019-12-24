import React, {useEffect, useState} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { getUserProfile } from "../../redux/actions";
import { IconButton } from '@material-ui/core';
import Profile from '../Profile';


function ProfileSurface(props) {
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  
  useEffect(() => {
    props.getUserProfile(props.profileid);
  }, [])

  // useEffect(() => {
  //   console.log('props.profileid has changed: ', props.profileid);
  //   console.log('userprofileid has changed: ', userprofileid);
  // }, [userprofileid])

  const handleProfileClick = (profileidfromclick) => {
    console.log('profileid from click - ',profileidfromclick)
    props.getUserProfile(profileidfromclick)
  }

  return (
    <div>
      <IconButton aria-label='back' onClick={() => {
        console.log('back button has been clicked on profile!',);
        // setUserprofileid(0);
        console.log('after userprofileid: ', userprofileid);
      }}>
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
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
