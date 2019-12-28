import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    typography: {
        padding: theme.spacing(2),
    },
}));

function Result({ result, usergridProfileIdCallback }) {
  const classes = useStyles();
  const [id, firstName, lastName, email, githubUrl, linkedinUrl] = result;
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileuserid, setProfileUserid] = useState();

  const handleClick = event => {
    console.log("1) in handle click of result: ", event.currentTarget);
    console.log("2) email linkedin github: ", email, githubUrl, linkedinUrl);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    useEffect(() => {
        //Note that the due to the nature of behavior of useEffect with profileuserid as dependency, the following log line is executed once during first page render.
        //This can be the cause for a certain unintended side-effect. Look into how to avoid this. 
    //   console.log("profileuserid: ", profileuserid);
      usergridProfileIdCallback(profileuserid)
  }, [profileuserid]);

  const open = Boolean(anchorEl);
  const popoverid = open ? "simple-popover" : undefined;

  return (
    <Card className={classes.card} key={result.id}>
      <CardActionArea key={result.id}>
        <CardMedia
          component="img"
          key={result.id}
          alt={id}
          height="180"
          image={process.env.PUBLIC_URL + "/profile.jpg"}
          title="Contemplative Reptile"
          onClick={e => {
            setProfileUserid(e.currentTarget["alt"]);
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" key={result.id} component="h6">
            {" "}
            {firstName} {lastName}{" "}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" key={result.id} component="p"> Skills: {email} </Typography> */}
          <Rating name="half-rating" value={3} precision={0.25} />
        </CardContent>
      </CardActionArea>
      <CardActions key={result.id}>
        <Button
          size="small"
          key={result.id}
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          {" "}
          Email{" "}
        </Button>
        <Popover
          id={popoverid}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography key={result.id} className={classes.typography}>
            {email}
          </Typography>
        </Popover>

        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          {" "}
          GitHub{" "}
        </Button>
        <Popover
          id={popoverid}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography key={result.id} className={classes.typography}>
            {githubUrl}
          </Typography>
        </Popover>

        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          {" "}
          Linkedin{" "}
        </Button>
        <Popover
          id={popoverid}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Typography key={result.id} className={classes.typography}>
            {linkedinUrl}
          </Typography>
        </Popover>
      </CardActions>
    </Card>
  );
}

export default Result
