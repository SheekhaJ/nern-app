import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { fetchUsers } from '../redux/actions';
import Rating from '@material-ui/lab/Rating';

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
    
    const [q, setQ] = useState('')
    const [queryResUsers, setQueryResUsers] = useState([]);

    const userProfileInfo = Object.assign({}, props.userProfile)
    const languages = Object.assign([], props.languages)
    const friends = Object.assign(new Map(), props.friends)
    // const friends = Object.assign({}, props.friends)
    // const [firstName, lastName, email, githubUrl, linkedinUrl] = userProfileInfo
    // const [friends, setFriends] = useState(props.friends);
    // const [languages, setLanguages] = useState(props.languages);

    const handleLanguageClick = (query) => {
        console.log('query: ', query)
        // setQ(q)
        // console.log('query: ', q)
        props.getQueryResultUsers(query);
    }

    useEffect(() => {
        // setQueryResUsers(props.users);
        var resUsers = []
        if (props.users) {
            props.users.forEach(user => {
                resUsers.push()
            })
            setQueryResUsers(resUsers)
        }
        console.log('result users from backend: ', queryResUsers);
    }, [props.users])

    // console.log('in profile: ',typeof friends)
    return (
        <div>
            {userProfileInfo && friends && languages && (
            // {userProfileInfo && languages && (
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
                    <Grid item xs={8}>
                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                First Name:{userProfileInfo['firstName']}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                Last Name:{userProfileInfo['lastName']}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                Languages: {languages.map((language) => (
                                    // <Button color="primary" >{language}</Button>
                                    <div>
                                        <Button color="primary" onClick={(e) => handleLanguageClick(e.target.innerHTML)} >{language}</Button>
                                    </div>
                                ))}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        {/* <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                Friends: {friends}  */}
                                {/* Friends: {friends.forEach(element => (
                                    // console.log('friend: ', friend);
                                <Typography> {element} </Typography> ))} */}
                            {/* </Typography>
                        </Grid> */}
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('result users: ', state.getUsers.users);
    return {
        users: state.getUsers.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQueryResultUsers: (query) => dispatch(fetchUsers(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
// export default Profile
