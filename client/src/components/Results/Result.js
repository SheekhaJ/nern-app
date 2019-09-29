import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

function Result({result}) {
    const classes = useStyles();
    const [id, firstName, lastName, email, githubUrl, linkedinUrl] = result
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverid = open ? 'simple-popover' : undefined;

    return (
        <Card className={classes.card} key={result.id}>
            <CardActionArea key={result.id}>
                <CardMedia component="img" key={result.id} alt={firstName} height="180" image={process.env.PUBLIC_URL+'/profile.jpg'} title="Contemplative Reptile" />
                <CardContent>
                    <Typography gutterBottom variant="h5" key={result.id} component="h6"> {firstName} {lastName} </Typography>
                    <Typography variant="body2" color="textSecondary" key={result.id} component="p"> Skills: {email} </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions key={result.id}>
                <Button size="small" key={result.id} color="primary" variant="contained" onClick={handleClick}> Email </Button>
                <Popover
                id={popoverid} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                    <Typography key={result.id} className={classes.typography}>{email}</Typography>
                </Popover>
                
                <Button size="small" color="primary" variant="contained" onClick={handleClick}> GitHub </Button>
                <Popover
                id={popoverid} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                    <Typography key={result.id} className={classes.typography}>{githubUrl}</Typography>
                </Popover>

                <Button size="small" color="primary" variant="contained" onClick={handleClick}> Linkedin </Button>
                <Popover
                id={popoverid} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                    <Typography key={result.id} className={classes.typography}>{linkedinUrl}</Typography>
                </Popover>
            </CardActions>
        </Card>
    )
}

export default Result
