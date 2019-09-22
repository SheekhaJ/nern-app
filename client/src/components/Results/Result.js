import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
});

function Result({result}) {
    const classes = useStyles();
    const {firstName, lastName, skills} = result

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia component="img" alt={firstName} height="140" image="/static/images/cards/contemplative-reptile.jpg" title="Contemplative Reptile" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2"> {firstName}+{lastName} </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"> Skills: {skills} </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary"> Email </Button>
                <Button size="small" color="primary"> GitHub </Button>
                <Button size="small" color="primary"> LinkedIn </Button>
            </CardActions>
        </Card>
    )
}

export default Result
