import React, { useEffect, useState } from 'react'
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
    
    const [userprofileid, setUserprofileid] = useState(props.userprofileid);

    const userProfileInfo = Object.assign({}, props.userProfile)
    const languages = Object.assign([], props.languages)
    
    var friends = new Map();
    props.friends.forEach((value, key) => {
        friends[key] = value
    })

    const handleLanguageClick = (query) => {
        console.log('language query: ', query)
    }

    useEffect(() => {
        props.usergridProfileIdCallback(userprofileid);
    }, [userprofileid])

    return (
        <div>
            {userProfileInfo && friends && languages && (
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
                                    <div>
                                        <Button color="primary" onClick={(e) => handleLanguageClick(e.target.innerHTML)} >{language}</Button>
                                        <Rating name="half-rating" value={3.25} precision={0.25} />
                                    </div>
                                ))}
                            </Typography>
                            <Divider variant="middle" orientation="horizontal" />
                        </Grid>

                        <Grid item xs={8} justify="flex-start">
                            <Typography gutterBottom variant="h5" component="h6">
                                Friends: {Object.keys(friends).map((key) => (
                                    <Button color='primary' variant='outlined' id={friends[key]['id']} onClick={(e) =>
                                        setUserprofileid(Object.keys(friends).find(id => friends[id]['firstName'] + ' ' + friends[id]['lastName'] == e.target.innerHTML))
                                    } >
                                        {friends[key]['firstName']} {friends[key]['lastName']}
                                    </Button>
                                ))}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
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
