import React, {useEffect, useState} from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from 'react-redux';
import { getUserProfile } from "../../redux/actions";
import { IconButton } from '@material-ui/core';
import Profile from '../Profile';


function ProfileSurface(props) {
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  const [profileInfo, setProfileInfo] = useState([]);
  const [friends, setFriends] = useState([])
  const [languages, setLanguages] = useState([])
  
  useEffect(() => {
    props.getUserProfile(props.profileid);
  }, [])

  useEffect(() => {
    console.log('initial friends: ',friends)
    var _friends = []
    if (props.friendsInfo) {
      props.friendsInfo.forEach(f => {
        _friends.push(f)
      })
      setFriends(_friends)
    }
  }, [props.friendsInfo]);

  useEffect(() => {
    console.log('after setting friends: ', friends)
  }, [friends])

  useEffect(() => {
    var _languages = []
    if (props.languages) {
      props.languages.forEach((language) => {
        _languages.push(language)
      })
      setLanguages(_languages);
    }
  }, [props.languages]);
  
  // useEffect(() => {
  //   console.log('after setting languages: ',languages)
  // }, [languages])

  // console.log('initial friends: ',friends )

  return (
    <div>
      <IconButton aria-label='back' onClick={() => {
        console.log('back button has been clicked on profile!',);
        // setUserprofileid(0);
        console.log('after userprofileid: ', userprofileid);
      }}>
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
      {friends !== [] && languages !== [] && <Profile userprofileid={userprofileid} friends={friends} languages={languages}></Profile>}
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
