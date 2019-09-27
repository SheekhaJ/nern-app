import React, {useState, useEffect} from 'react'
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

function UserGrid() {
    const [spacing, setSpacing] = useState(2);
    const classes = useStyles();
    const [results, setResults] = useState([]);

    useEffect(()=>{
        axios.get(baseUrl+'/users')
        .then((response)=>{
            var res = response.data.result.records;
            var results = new Array();

            for(var i=0; i<res.length; i++){
                var r = res[i]
                const id = r._fields[0]
                const firstName = r._fields[1]
                const lastName = r._fields[2]
                const email = r._fields[3]
                const githubUrl = r._fields[4]
                const linkedinUrl = r._fields[5]
                results.push([id, firstName, lastName, email, githubUrl, linkedinUrl]);
            }
            setResults(results)
        }).catch((error)=>{
            console.log('error: '+error);
        });
    }, [])

    return (
        <Grid container className={classes.root} spacing={10}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {results.map(result => (
                        <Grid key={result.id} item>
                            <Result key={result.id} result={result}></Result>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
            )
        }
        
export default UserGrid
