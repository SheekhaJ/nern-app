import React, {useEffect, useState} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { getUserProfile } from "../../redux/actions";
import { IconButton, Typography } from '@material-ui/core';
import Profile from '../Profile';


function ProfileSurface(props) {
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  
  useEffect(() => {
    props.getUserProfile(props.profileid);
  }, [])

  useEffect(() => {
    var _friends = []
    if (props.friendsInfo) {
      props.friendsInfo.forEach(f => {
        _friends.push(f)
      })
      setFriends(_friends)
    }
  }, [props.friendsInfo]);

  useEffect(() => {
    var _languages = []
    if (props.languages) {
      props.languages.forEach((language) => {
        _languages.push(language)
      })
      setLanguages(_languages);
    }
  }, [props.languages]);
  
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
        <Profile userprofileid={userprofileid} userProfile={props.userProfileInfo} friends={props.friendsInfo} languages={props.languageInfo}></Profile>
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
