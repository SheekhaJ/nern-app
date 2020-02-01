import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from '@material-ui/lab/ToggleButton';
import { connect } from 'react-redux';
import { getUserFriends } from '../redux/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}))

function AddFriends(props) {
    const classes = useStyles();

    const [displayAlert, setDisplayAlert] = useState(false);
    const [displayDialogBox, setDisplayDialog] = useState(false);
    const [friends, setFriends] = useState();
    const [selectedFriends, setSelectedFriends] = useState(()=>[]);

    const handleClickOpen = (e) => {
        console.log('add friend button clicked! type ', localStorage.getItem('eruid') === 'undefined');
        if (localStorage.getItem('eruid') == 'undefined' && localStorage.getItem('erAuthFirstName') == 'undefined' && localStorage.getItem('erAuthLastName') == 'undefined') {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);
            setDisplayDialog(true);
            props.getLoggedInUsersFriends(localStorage.getItem('eruid'));
        }
    }

    const handleAlertClose = () => {
        setDisplayAlert(false);
    }

    const handleDialogClose = () => {
        setDisplayDialog(false);
    }

    const handleFriendsChange = (e, newFriends) => {
        setSelectedFriends(newFriends);
    }

    useEffect(() => {
        console.log('selected friends are ', selectedFriends);
    }, [selectedFriends]);

    useEffect(() => {
        setFriends(props.friends)
    }, [props.friends])

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Friends
            </Button>
            <Dialog
                open={displayAlert}
                onClose={handleAlertClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Friends</DialogTitle>
                <DialogContent>
                    <DialogContentText>You must be logged in to add friends!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={displayDialogBox}
                onClose={handleDialogClose}>
                <DialogTitle id="form-dialog-title" >Add Friends</DialogTitle>
                <DialogContent>
                    <DialogContentText>Select the names of your friends</DialogContentText>
                    <div className={classes.toggleContainer}>
                        {friends && <ToggleButtonGroup value={selectedFriends} onChange={handleFriendsChange} aria-label='friends' >
                            {friends.map(friend => (
                                <ToggleButton value={friend} >
                                    {friend.firstName} {friend.lastName}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>Done</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        friends: state.getUserFriends.friendsDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedInUsersFriends: (userid) => dispatch(getUserFriends(userid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
