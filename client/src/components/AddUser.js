import React, {useState} from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import validate from 'validate.js';
import constraints from '../Util/constraints';

export function AddUser(props) {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: '' })
  const [openAlert, setOpenAlert] = useState(false);
  const [errors, setErrors] = useState(null);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
  };

  const handleSubmit = () => {
    const errs = validate({ firstName: user.firstName, lastName: user.lastName, emailAddress: user.email, githubUrl: user.githubUrl, linkedinUrl: user.linkedinUrl },
    {firstName: constraints.firstName, lastName: constraints.lastName, emailAddress: constraints.emailAddress, githubUrl: constraints.githubUrl, linkedinUrl: constraints.linkedinUrl});
    console.log('errs: ', errs);

    if (errs) {
      setErrors(errs)
    // }
    // if (user.firstName === '' || user.lastName === '') {
    //   setOpenAlert(true)
    } else {
      props.addNewUser(user);
      setOpen(false);
      setUser({ firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: '' });
    }
  }

  const handleAlertClose = () => {
    setOpenAlert(false);
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
          <DialogTitle id="form-dialog-title">Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText> Enter User Details: </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              label="First Name"
              value={user.firstName}
              fullWidth
              onChange={e => {
                setUser({ ...user, firstName: e.target.value });
              }}
              error={!!(errors && errors.firstName)}
              helperText={(errors && errors.firstName) ? errors.firstName[0] : ''}
            />
            <TextField
              required
              margin="dense"
              id="lastName"
              label="Last Name"
              value={user.lastName}
              fullWidth
              onChange={e => {
                setUser({ ...user, lastName: e.target.value });
              }}
              error={!!(errors && errors.lastName)}
              helperText={(errors && errors.lastName) ? errors.lastName[0] : ''}
            />
            <TextField
              required
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={user.email}
              fullWidth
              onChange={e => {
                setUser({ ...user, email: e.target.value });
              }}
              error={!!(errors && errors.emailAddress)}
              helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
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
              error={!!(errors && errors.githubUrl)}
              helperText={(errors && errors.githubUrl) ? errors.githubUrl[0] : ''}
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
              error={!!(errors && errors.linkedinUrl)}
              helperText={(errors && errors.linkedinUrl) ? errors.linkedinUrl[0] : ''}
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

        {/* <Dialog aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description' open={openAlert} onClose={handleAlertClose}>
          <DialogTitle id='alert-dialog-title'>{"Invalid input for new user"}</DialogTitle>
          <DialogContent id='alert-dialog-description'>First and Last name of new user are mandatory</DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color='primary'>Cancel</Button>
            <Button onClick={handleAlertClose} color='primary'>Ok</Button>
          </DialogActions>
        </Dialog> */}
      </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addUser(user)),
  }
}

export default connect(null, mapDispatchToProps) (AddUser)