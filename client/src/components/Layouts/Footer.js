import React from 'react'
import { Paper } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

function Footer() {
    const classes = useStyles();

    return (
        <div>
            <Paper classes='rounded'>
            <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>About Us</Typography>
                    </Toolbar>
                </AppBar>
            </Paper>
        </div>
    )
}

export default Footer
