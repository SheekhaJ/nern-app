import React, {useState, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import LoginDialog from '../LoginDialog';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { fetchUsers } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
          },
        },
      },
}));

function Header(props) {
    const classes = useStyles();
    const [q, setQ] = useState('')
    const [queryResUsers, setQueryResUsers] = useState([]);
  
  const submitQuery = (q) => {
    console.log('query: ',q)
    props.getQueryResultUsers(q);
  }

  useEffect(() => {
    setQueryResUsers(props.users);
  }, [props.users])

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <LoginDialog />
            <Button variant='contained' color='primary' onClick={() => {
              console.log('header clicked!'); props.resetProfileUseridCallback();
            }} >
              Expert Recommender System
            </Button>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search.."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={e => {
                  setQ(e.target.value);
                }}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                      submitQuery(q);
                    }
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQueryResultUsers: (query) => dispatch(fetchUsers(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Header)
