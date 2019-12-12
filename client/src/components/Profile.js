import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import getUserProfile from '../redux/actions'

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


function Profile(props) {
    const classes = useStyles();
    const [profileInfo, setProfileInfo] = useState({firstName: props.firstName, lastName: props.lastName, email: props.email});
    const [friends, setFriends] = useState(props.friends);
    const [languages, setLanguages] = useState(props.languages);

    console.log('friends in profile component: ', friends);
    return (
        <div>
            {profileInfo && friends && languages && (
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
                    {props.userprofileid}
                    <Grid item xs={8}>
                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                {/* First Name:{props.userProfileInfo["firstName"]} */}
                                First Name: 
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                {/* Last Name:{props.userProfileInfo["lastName"]} */}
                                Last Name: {profileInfo['lastName']}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                {/* Languages: {props.languageInfo.map((language) => (
                                    <Typography>{language}</Typography>
                                ))} */}
                                Languages: {languages}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                Friends: {friends}
                                {/* Friends : {props.friendsInfo.forEach(f => {
                                    console.log('render id ', f['id'])
                                    return <>{`${f['firstName']} ,`}</>
                                })} */}
                                {/* {profileInfo && profileInfo.forEach(f => {
                    return <>{`| ${f['lastName']} ,`}</>
                  })} */}
                                {/* Friends: 
                  {props.friendsInfo.map((friend) => (
                    <Button>{friend['firstName']}</Button>
                  ))} */}
                                {/* Friends: {props.friendsInfo && props.friendsInfo.map([],).map((info) => {
                    console.log('inside component ',info) */}
                                {/* })} */}
                </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         id: state.user.profileid,
//         firstName: state.user.firstName,
//         lastName: state.user.lastName,
//         email: state.user.email,
//         githubUrl: state.user.githubUrl,
//         linkedinUrl: state.user.linkedinUrl
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUserProfile: dispatch(getUserProfile())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export default Profile
