import React from 'react'
import Result from './Result'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
}));

const baseUrl = 'http://localhost:3001';

function getUserInfo(){
    axios.get(baseUrl+'/users')
    .then((response)=>{
        results = response.data.result.records;
        // result.map((r)=>console.log(r._fields))
        results.map((r)=>{
            const firstName = r._fields[0]
            const lastName = r._fields[1]
            const email = r._fields[2]
            const githubUrl = r._fields[3]
            const linkedinUrl = r._fields[4]
            // console.log(firstName, lastName, email, githubUrl, linkedinUrl);
        });
    }).catch((error)=>{
        console.log('error: '+error);
    });
}

function UserGrid() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    // const results = [
    //     { id: 1, firstName: 'Sheekha', lastName: 'Jariwala', skills: 'Python, Javascript' },
    //     { id: 2, firstName: 'Vijay', lastName: 'Tadimeti', skills: 'Python, Ruby' },
    //     { id: 3, firstName: 'Sonam', lastName: 'Gyanchandani', skills: 'Python, HTML' },
    //     { id: 4, firstName: 'Damanpreet', lastName: 'Kaur', skills: 'Python' }]

    // const resultList = results.map(res => <Result key={res.id} result={res}></Result>)
    const results = getUserInfo();
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
        
export default UserGrid
