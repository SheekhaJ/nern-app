import React, {useState, useEffect} from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
import { makeStyles } from "@material-ui/core/styles";
import { loginUser } from '../redux/actions';
import { connect } from "react-redux";

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    }
  }));
  

function LoginDialog(props) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [loggedUserFirstName, setLoggedUserFirstName] = useState('')
    const [loggedUserLastName, setLoggedUserLastName] = useState('')
  const classes = useStyles();

    const handleClickOpen = () => {
      setOpen(true);
    };

  const handleClose = () => {
      setOpen(false);
    };

  const login = () => {
      props.loginuser(username)
      setOpen(false)
  };

  useEffect(() => {
    setLoggedUserFirstName(props.fname);
    setLoggedUserLastName(props.lname);
  }, [props.fname, props.lname]);

    return (
      <div>
        {!loggedUserFirstName && !loggedUserLastName &&
          <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Log In
        </Button>}
        {loggedUserFirstName && loggedUserLastName && <Button variant='outlined'
          className={classes.button} color='inherit'>
          {loggedUserFirstName} {loggedUserLastName}
        </Button>}
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
              onChange={e => {
                setUsername(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {login(username);}}
              color="primary"
            >
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

const mapStateToProps = (state) => {
  // console.log(
  //   "in mapstatetoprops: ", state, 
  //   state.loginUser.loggedInUser["fName"],
  //   state.loginUser.loggedInUser["lName"]
  // );
  
  return {
    fname: state.loginUser.loggedInUser['fName'],
    lname: state.loginUser.loggedInUser['lName']
    // ...state.loginUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginuser: (username) => dispatch(loginUser(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)
