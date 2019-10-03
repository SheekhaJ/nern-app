import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UserGrid from '../Results/UserGrid';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

function Surface() {
    const classes = useStyles();

    return (
      <div>
        <Paper className={classes.root}>
        <UserGrid></UserGrid>
        </Paper>
      </div>
    );
}

export default Surface
