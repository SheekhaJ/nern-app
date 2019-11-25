import React, {useState, useEffect} from 'react'
import Result from './Result'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {fetchUsers} from '../../redux/actions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

function UserGrid(props) {
    const [spacing, setSpacing] = useState(6);
    const classes = useStyles();
    const [userprofileid, setUserprofileid] = useState('');
    
    useEffect(() => {
        props.fetchUsersAction();
    }, []);

    useEffect(() => {
        props.usergridProfileIdCallback(userprofileid);
    },[userprofileid])

    const getUserprofileid = (profileUseridFromResult) => {
        console.log('in usergrid profileid: ', profileUseridFromResult);
        setUserprofileid(profileUseridFromResult);
    }
    
    return (
        <Grid container className={classes.root} justify="center" spacing={10}>
            <Grid item xs={9}>
                <Grid container justify="center" spacing={spacing}>
                   {props.users && props.users.map(result => (
                        <Grid key={result.id} item>
                            <Result key={result.id} result={result} usergridProfileIdCallback={getUserprofileid}></Result>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
            )
        }
        
const mapStateToProps = (state) => {
    return {
        users: state.getUsers.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersAction: () => dispatch(fetchUsers())
    }
}
        
export default connect(mapStateToProps, mapDispatchToProps)(UserGrid)
