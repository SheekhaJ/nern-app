import React, {useState, useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function SkillRating(props) {
    const [value, setValue] = useState(props.rating);
    const [displayAlert, setDisplayAlert] = useState(false);

    const handleLanguageClick = (e) => {
        if (localStorage.getItem('eruid') == 'undefined' && localStorage.getItem('erAuthFirstName') == 'undefined' && localStorage.getItem('erAuthLastName') == 'undefined') {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);
        }
    }

    const handleAlertClose = () => {
        setDisplayAlert(false);
    }

    useEffect(() => {
        console.log('loggedinuserid - ', props);
    }, [])

    return (
        <div>
            <Dialog
                open={displayAlert}
                onClose={handleAlertClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Submit Rating</DialogTitle>
                <DialogContent>
                    <DialogContentText>You must be logged in to submit rating for user's skill!</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAlertClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Button color="primary" onClick={(e) => handleLanguageClick(e.target.innerHTML)} >{props.language}</Button>
            <Rating name="half-rating" value={value} onChange={(e,newValue) => (console.log('newval: ',newValue), setValue(newValue))} />
        </div>
    );
}

export default SkillRating;