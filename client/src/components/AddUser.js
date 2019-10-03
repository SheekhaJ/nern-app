import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

export default function AddUser() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log('handle click open called!')
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

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
            <DialogContentText>
              Enter user details:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              fullWidth
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="githubUrl"
              label="GitHub URL"
              fullWidth
            />
            <TextField
              margin="dense"
              id="linkedinUrl"
              label="LinkedIn URL"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

// export default AddUser