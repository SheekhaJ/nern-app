import React, {useState, useEffect} from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from '../redux/actions';
import { connect } from "react-redux";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import validate from 'validate.js';
import constraints from '../Util/constraints';

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    }
  }));


function LoginDialog(props) {
    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [username, setUsername] = useState('');
    const [loggedUserID, setLoggedUserID] = useState('');
    const [loggedUserFirstName, setLoggedUserFirstName] = useState('');
    const [loggedUserLastName, setLoggedUserLastName] = useState('');
    const [errors, setErrors] = useState(null);
    const classes = useStyles();
  

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
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleSnackBarClickClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }

    const handleLoginDialogClickOpen = () => {
      setOpenLoginDialog(true);
    };

  const handleLoginDialogClickClose = () => {
      setOpenLoginDialog(false);
  };
  
  const handleSnackBarClickClose = () => {
    setOpenSnackBar(false);
  }

  const login = (loginusername) => {
    const errs = validate({ emailAddress: loginusername }, { emailAddress: constraints.emailAddress });
    
    if (errs) {
      setErrors(errs);
    } else {
      setErrors(null);
      props.loginuser(loginusername);
    // setUsername('')
    // setOpen(false)
    }
  };

  useEffect(() => {
    if (props.uid !== 'unauthenticated' && props.fname !== 'unauthenticated' && props.lname !== 'unauthenticated') {
      localStorage.setItem('eruid', props.uid)
      localStorage.setItem('erAuthFirstName', props.fname);
      localStorage.setItem('erAuthLastName', props.lname);
      setLoggedUserID(localStorage.getItem('eruid'));
      setLoggedUserFirstName(localStorage.getItem('erAuthFirstName'));
      setLoggedUserLastName(localStorage.getItem('erAuthLastName'));
      // setLoggedUserID(props.uid)
      // console.log('userid, firstname, lastname: ', localStorage.getItem('eruid'), localStorage.getItem('erAuthFirstName'), localStorage.getItem('erAuthLastName'))
      // console.log('userid, firstname, lastname: ', props.uid, props.fname, props.lname);
      // console.log('userid, firstname, lastname: ', loggedUserID, loggedUserFirstName, loggedUserLastName);
      // setUsername('')
      console.log('username: ', username);
      setOpenLoginDialog(false)
      if (props.uid && props.fname && props.lname) {
        setOpenSnackBar(true);
      }
    } else if (props.uid === 'unauthenticated' && props.fname === 'unauthenticated' && props.lname === 'unauthenticated') {
      setOpenSnackBar(true);
    } else {
      //Do nothing
    }
  }, [props.uid, props.fname, props.lname]);

    return (
      <div>
        {['undefined', 'unauthenticated'].includes(loggedUserID) && ['undefined', 'unauthenticated'].includes(loggedUserFirstName)
          && ['undefined', 'unauthenticated'].includes(loggedUserLastName) &&
          <Button variant="outlined" color="inherit" onClick={handleLoginDialogClickOpen}>
            Log In
        </Button>}
        {!['', 'unauthenticated','undefined'].includes(loggedUserID) && !['', 'unauthenticated', 'undefined'].includes(loggedUserFirstName)
          && !['','unauthenticated', 'undefined'].includes(loggedUserLastName) &&
          <Button variant='outlined'
          className={classes.button} color='inherit'>
          {loggedUserFirstName} {loggedUserLastName}
        </Button>}
        <Dialog
          open={openLoginDialog}
          onClose={handleLoginDialogClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Log In</DialogContentText>
            <TextField
              autoFocus required
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              value={username}
              fullWidth
              placeholder = 'john@doe.com'
              onChange={e => {
                setUsername(e.target.value);
              }}
              error={!!(errors && errors.emailAddress)}
              helperText={(errors && errors.emailAddress) ? errors.emailAddress[0] : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginDialogClickClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => { login(username);}}
              color="primary"
            >
              Log In
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleSnackBarClickClose} >
          <SnackbarContentWrapper onClose={handleSnackBarClickClose}
            variant={(props.uid !== 'unauthenticated' && props.fname !== 'unauthenticated' && props.lname !== 'unauthenticated') ? 'success' : 'error'}
            message={(props.uid !== 'unauthenticated' && props.fname !== 'unauthenticated' && props.lname !== 'unauthenticated') ? 'Login successful' : 'Login failed'}
            >
          </SnackbarContentWrapper>
        </Snackbar>
      </div>
    );
}

const mapStateToProps = (state) => {
  //When user is authenticated successfully.
  if (state.loginUser.loggedInUser) {
    return {
      uid: state.loginUser.loggedInUser['uid'],
      fname: state.loginUser.loggedInUser['fName'],
      lname: state.loginUser.loggedInUser['lName']
    }
  //When user is not authenticated successfully. 
  } else if(state.loginUser.loginError) {
    return {
      uid: 'unauthenticated',
      fname: 'unauthenticated',
      lname: 'unauthenticated'
    }
  //When user has not attempted to log-in.
  } else {
    return {
      
    };
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginuser: (username) => dispatch(loginUser(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
