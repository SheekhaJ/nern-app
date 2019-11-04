import React, {useState} from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';

function LoginDialog() {
    const baseUrl = "http://localhost:3001";
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const login = (username) => {
        console.log('login clicked ', username);
    };

    return (
      <div>
        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Log In
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Log In</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              value={username}
              fullWidth
                onChange={e => {setUsername(e.target.value);}}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
                    <Button onClick={() => {login(username)}} color="primary">
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default LoginDialog
