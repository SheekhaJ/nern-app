import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { getUserProfile } from "../../redux/actions";
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  section2: {
    margin: theme.spacing(2)
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 120
  }
}));

function ProfileSurface(props) {
    const classes = useStyles();
  const [userprofileid, setUserprofileid] = useState(props.profileid);
  const [profileInfo, setProfileInfo] = useState(props.userProfileInfo);
  const [friends, setFriends] = useState(props.friendsInfo);
  const [languages, setLanguages] = useState(props.languagesInfo);
  
  useEffect(() => {
    // console.log('inside useeffect of profile surface: ', props.profileid)
    props.getUserProfile(userprofileid);
  }, [])

  useEffect(() => {
    console.log("inside useeffect in profilesurface  ", props.friendsInfo);
    for (const [key, val] of new Map(props.friendsInfo).entries()) {
      console.log('friend: ',key,val)
    }
  }, [props.friendsInfo]);

  return (
    <div>
      <IconButton aria-label='back' onClick={() => {
        console.log('back button has been clicked on profile!',);
        // setUserprofileid(0);
        console.log('after userprofileid: ', userprofileid);
      }}>
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
      <div>
        {props.userProfileInfo && props.friendsInfo && props.languageInfo && (
          <Grid
            container
            spacing={3}
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item lg={12}>
              <Paper className={classes.paper}></Paper>
              <Divider variant="middle" orientation="horizontal" />
            </Grid>
            <Grid item xs={4} justify="flex-end">
              <Avatar
                alt="User"
                src={process.env.PUBLIC_URL + "/profile.jpg"}
                className={classes.bigAvatar}
              />
            </Grid>
            {props.profileid}
            <Grid item xs={8}>
              <Grid item xs={8} justify="flex-start">
                <Typography gutterBottom variant="h5" component="h6">
                  First Name:{props.userProfileInfo["firstName"]}
                </Typography>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>

              <Grid item xs={8} justify="flex-start">
                <Typography gutterBottom variant="h5" component="h6">
                  Last Name:{props.userProfileInfo["lastName"]}
                </Typography>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>

              <Grid item xs={8} justify="flex-start">
                <Typography gutterBottom variant="h5" component="h6">
                  Languages: {props.languageInfo.map((language) => (
                    <Typography>{language}</Typography>
                  ))}
                </Typography>
                <Divider variant="middle" orientation="horizontal" />
              </Grid>

              <Grid item xs={8} justify="flex-start">
                <Typography gutterBottom variant="h5" component="h6">
                  Friends : {props.friendsInfo}
                  {/* Friends: 
                  {props.friendsInfo.map((friend) => (
                    <Button>{friend['firstName']}</Button>
                  ))} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
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
