import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddFriends(props) {
    const [displayAlert, setDisplayAlert] = useState(false);
    const [displayDialogBox, setDisplayDialog] = useState(false);

    const handleClickOpen = (e) => {
        console.log('add friend button clicked! type ', localStorage.getItem('eruid') === 'undefined');
        if (localStorage.getItem('eruid') == 'undefined' && localStorage.getItem('erAuthFirstName') == 'undefined' && localStorage.getItem('erAuthLastName') == 'undefined') {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);
            setDisplayDialog(true);
        }
    }

    const handleAlertClose = () => {
        setDisplayAlert(false);
    }

    const handleDialogClose = () => {
        setDisplayDialog(false);
    }

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color='primary'>Done</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default AddFriends;