import React, {useState, useEffect} from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';
import validate from 'validate.js';
import constraints from '../Util/constraints';
import { makeStyles } from "@material-ui/core/styles";

export function AddUser(props) {
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: '' })
  const [errors, setErrors] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };

  const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  function SnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }

    const handleClickOpen = () => {
      setOpenAddUserDialog(true);
      console.log('init value of props - ', props.addedUserInfo.user);
    };

    const handleClose = () => {
      setOpenAddUserDialog(false);
  };

  const handleSubmit = () => {
    const errs = validate({ firstName: user.firstName, lastName: user.lastName, emailAddress: user.email, githubUrl: user.githubUrl, linkedinUrl: user.linkedinUrl },
    {firstName: constraints.firstName, lastName: constraints.lastName, emailAddress: constraints.emailAddress, githubUrl: constraints.githubUrl, linkedinUrl: constraints.linkedinUrl});
    
    if (errs) {
      setErrors(errs)
    } else {
      props.addNewUser(user);
      // setOpen(false);
      // setUser({ firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: '' });
    }
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  useEffect(() => {
    // console.log('addedUserInfo value has been changed - ', props.addedUserInfo.user, props.addedUserInfo.user == null, props.addedUserInfo.user === null);
    if (typeof props.addedUserInfo.user !== 'undefined' && props.addedUserInfo.user !== null) {
      setOpenSnackbar(true);
      setOpenAddUserDialog(false);
      setUser({ firstName: '', lastName: '', email: '', githubUrl: '', linkedinUrl: '' });
    } else if (props.addedUserInfo.user === null) {
      setOpenSnackbar(true)
    } else {
      //Do nothing
    }
  }, [props.addedUserInfo])

    return (
      <div>
        {/* <Typography
          component="h6"
          variant="h6"
          color="primary"
          gutterBottom
          display="block"
        >
          Don't see yourself or someone you know?
        </Typography> */}
        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Sign Up
        </Button>
        <Dialog
          open={openAddUserDialog}
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
              required
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
              required
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
        <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose} >
          <SnackbarContentWrapper onClose={handleSnackbarClose}
            variant={typeof props.addedUserInfo.user !== 'undefined' && props.addedUserInfo.user !== null ? 'success' : 'error'}
            message={typeof props.addedUserInfo.user !== 'undefined' && props.addedUserInfo.user !== null ? 'User has been added successfully' : "User couldn't be added successfully"}>
          </SnackbarContentWrapper>
        </Snackbar>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    addedUserInfo: state.addUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addUser(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddUser)