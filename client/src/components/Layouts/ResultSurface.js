import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UserGrid from '../Results/UserGrid';
import Divider from '@material-ui/core/Divider';
import AddUser from '../AddUser';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
  }));

function ResultSurface() {
    const classes = useStyles();

    return (
      <div>
            <Paper className={classes.root}>
                <AddUser></AddUser>
                <Divider variant='middle' />
                <div className='classes.section2' >
                <UserGrid/>
                </div>
        
        </Paper>
      </div>
    );
}

export default ResultSurface
