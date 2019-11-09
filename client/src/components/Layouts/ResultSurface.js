import React from 'react'
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

    return (
      <div>
        <Paper className={classes.root}>
          <AddUser></AddUser>
          <Divider variant="middle" />
          <Typography
            component="h6"
            variant="h5"
            color="primary"
            gutterBottom
            display="block"
          >
            Number of results - {props.users.length}
          </Typography>
          <div className="classes.section2">
            <UserGrid />
          </div>
        </Paper>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users
  };
}

export default connect(mapStateToProps, null)(ResultSurface)
