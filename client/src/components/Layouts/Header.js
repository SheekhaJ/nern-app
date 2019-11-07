import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import LoginDialog from '../LoginDialog';

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

const baseUrl = 'http://localhost:3001';

function Header() {
    const classes = useStyles();
    const [q, setQ] = useState('')
  
    useEffect(()=>{
        axios.get(baseUrl+'/query?q='+q)
        .then((resp)=>{
          console.log(resp);
        })
        .catch((error)=>{
          console.log(error);
        });
    }, [q])

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <LoginDialog />
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">  */}
            {/* <MenuIcon /> */}
            {/* </IconButton> */}
            <Typography className={classes.title} variant="h6" noWrap>
              Expert Recommender System
            </Typography>
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
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Header
