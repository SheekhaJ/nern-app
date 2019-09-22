import React from 'react'
import Result from './Result'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const results = [
        { id: 1, firstName: 'Sheekha', lastName: 'Jariwala', skills: 'Python, Javascript' },
        { id: 2, firstName: 'Vijay', lastName: 'Tadimeti', skills: 'Python, Ruby' },
        { id: 3, firstName: 'Sonam', lastName: 'Gyanchandani', skills: 'Python, HTML' },
        { id: 4, firstName: 'Damanpreet', lastName: 'Kaur', skills: 'Python' }]

    // const resultList = results.map(res => <Result key={res.id} result={res}></Result>)

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
