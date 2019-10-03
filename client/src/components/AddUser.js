import React, {useState} from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

const baseUrl = 'http://localhost:3001';

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: ''})

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };
  
  const handleSubmit = () => {
    var bodyFormData = user;
    console.log('form data: ',bodyFormData)
    axios({
      method: 'post',
      url: baseUrl+'/adduser',
      data: bodyFormData
    }).then((response) => {
      console.log('response: ', response);
    }).catch((error) => {
      console.log('error: ', error);
    })
  }

    return (
      <div>
        <Typography
          component="h6"
          variant="h6"
          color="primary"
          gutterBottom
          display="block"
        >
          Don't see yourself or someone you know?
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add User
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add User</DialogTitle>
          <DialogContent>
            <DialogContentText> Enter user details: </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              value={user.firstName}
              fullWidth
              onChange={e => {
                setUser({ ...user, firstName: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              value={user.lastName}
              fullWidth
              onChange={e => {
                setUser({ ...user, lastName: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={user.email}
              fullWidth
              onChange={e => {
                setUser({ ...user, email: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              id="githubUrl"
              label="GitHub URL"
              value={user.githubUrl}
              fullWidth
              onChange={e => {
                setUser({ ...user, githubUrl: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              id="linkedinUrl"
              label="LinkedIn URL"
              value={user.linkedinUrl}
              fullWidth
              onChange={e => {
                setUser({ ...user, linkedinUrl: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

// export default AddUser