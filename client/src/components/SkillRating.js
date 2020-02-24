import React, {useState, useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from '@material-ui/core';

function SkillRating(props) {
    const [lang, setLang] = useState(props.language.replace(' ', '').replace('#', 'Sharp').replace('++', 'PlusPlus').replace('-', '_'))
    const [value, setValue] = useState(0)
    const [displayAlert, setDisplayAlert] = useState(false);

    const handleRatingsChange = (e, newValue) => {
        if (localStorage.getItem('eruid') == 'undefined' && localStorage.getItem('erAuthFirstName') == 'undefined' && localStorage.getItem('erAuthLastName') == 'undefined') {
            setDisplayAlert(true);
        } else {
            console.log('newval: ', e.currentTarget.innerHTML, newValue, lang);
            setValue(newValue);
        }
    }

    const handleAlertClose = () => {
        setDisplayAlert(false);
    }

    useEffect(() => {
        var temp = Object.keys(props.ratings).filter(key => lang == key)
            .reduce((obj, key) => {
                obj[key] = props.ratings[key]
                return obj
            }, {})
        setValue(parseInt(temp[lang]))
    }, [props.ratings])

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
            <div>
                <Typography color="primary">{props.language}</Typography>
                <Rating name={lang} value={value} onChange={handleRatingsChange} />
            </div>
        </div>
    );
}

export default SkillRating;