import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

function AddFriends(props) {

    const handleClickOpen = (e) => {
        console.log('add friend button clicked! type ', localStorage.getItem('eruid') === 'undefined');
        if (localStorage.getItem('eruid') =='undefined' && localStorage.getItem('erAuthFirstName') == 'undefined' && localStorage.getItem('erAuthLastName') == 'undefined') {
            alert('you need to be logged in to add friends!');
        } else {
            alert('you are logged in and can add friends!');
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Friends
            </Button>
        </div>
    );
}

export default AddFriends;