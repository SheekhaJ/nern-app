import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UserGrid from '../Results/UserGrid';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import AddUser from '../AddUser';
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
}));

function ResultSurface(props) {
  const classes = useStyles();
  const [query, setQuery] = useState('')
  const [profileuserid, setProfileuserid] = useState('')

  useEffect(() => {
    setQuery(props.query)
  },[props.query])

  const getUserprofileid = (userid) => {
    console.log('in resultsurface userid: ', userid);
    props.profileid(userid)
  }
  
    return (
      <div>
        <Paper className={classes.root}>
          <AddUser></AddUser>
          <Divider variant="middle" />
          {query ? (
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              display="block"
            >
              Number of results for query "{props.query}" - {props.users.length}
            </Typography>
          ) : (
            <Typography
              component="h6"
              variant="h5"
              color="primary"
              gutterBottom
              display="block"
            >
              Number of results - {props.users.length}
            </Typography>
          )}
          <div className="classes.section2">
            <UserGrid usergridProfileIdCallback={getUserprofileid} />
          </div>
        </Paper>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users,
    query: state.getUsers.q
  };
}

export default connect(mapStateToProps, null)(ResultSurface)
