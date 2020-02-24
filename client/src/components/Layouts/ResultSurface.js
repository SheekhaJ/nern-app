import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UserGrid from '../Results/UserGrid';
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import AddFriends from '../AddFriends';
import { connect } from "react-redux";
import { getSkills } from "../../redux/actions";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

function ResultSurface(props) {
  const classes = useStyles();
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(true)
  const skills = Object.assign({}, props.skills);

  useEffect(() => {
    setQuery(props.query)
  }, [props.query])
  
  useEffect(() => {
    if (props.skills != {}) {
      props.getSkills();
    }
  }, [])

  const getUserprofileid = (userid) => {
    console.log('in resultsurface userid: ', userid);
    props.profileid(userid)
  }
  
    return (
      <div>
        <Paper className={classes.root}>
          
          <AddFriends></AddFriends>
          
          <Divider variant="middle" />

          {/* {query ? (
            <Typography component="h6" variant="h5" color="primary" gutterBottom display="block" >
              Number of results for query "{props.query}" - {props.users.length}
            </Typography>
          ) : (
            <Typography component="h6" variant="h5" color="primary" gutterBottom display="block" >
              Number of results - {props.users.length}
            </Typography>
            )} */}
          
          <div className="classes.section2">
            {props.skills && Object.keys(skills).map((skillid, index) => (
              <ExpansionPanel expanded={true} key={skillid} >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                  <Typography className={classes.heading} color="primary" variant="h5" component="h6" >{skills[skillid]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <UserGrid usergridProfileIdCallback={getUserprofileid} key={skillid} skill={skills[skillid]} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}

          </div>
        </Paper>
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    users: state.getUsers.users,
    query: state.getUsers.q,
    skills: state.getSkills.skills
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSkills: () => dispatch(getSkills())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultSurface)
