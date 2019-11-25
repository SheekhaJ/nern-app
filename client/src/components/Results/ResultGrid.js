import React, {useState} from 'react'
import Result from './Result'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
}));

function ResultGrid() {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {results.map(result => (
                        <Grid key={result.id} item>
                            {/* <Paper className={classes.paper} >{result.firstName}</Paper> */}
                            <Result key={result.id} result={result}></Result>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
            )
        }
        
        export default ResultGrid
