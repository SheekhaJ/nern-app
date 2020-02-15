import React, {useState, useEffect} from 'react';
import Rating from '@material-ui/lab/Rating';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { getUserRatings } from '../redux/actions';

const handleLanguageClick = (e) => {
    console.log('event triggered by ', e.currentTarget);
}

function SkillRating(props) {
    const [value, setValue] = useState(props.rating);
    const [profileuserid, setProfileuserid] = useState(props.selectedprofileuserid);
    // const [userRatings, setUserRatings] = useState(props.ratings);

    useEffect(() => {
        console.log('loggedinuserid - ', props);
        // props.getUserRatings(localStorage.getItem('eruid'), props.selectedprofileuserid)
    }, [])

    // useEffect(() => {
    //     console.log('user ratings from backend - ', props.ratings);
    // }, [props.ratings]);

    // console.log('props in skill rating component - ', props);
    return (
        <div>
            <Button color="primary" onClick={(e) => handleLanguageClick(e.target.innerHTML)} >{props.language}</Button>
            <Rating name="half-rating" value={value} onChange={(e,newValue) => (console.log('newval: ',newValue), setValue(newValue))} />
        </div>
    );
}

// const mapStateToProps = (state) => {
//     console.log('mapstatetoprops in skillrating - ', state);
//     return {
//         ratings: state.getUserRatings.ratings
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUserRatings: (loggedinuserid, selectedprofileuserid) => dispatch(getUserRatings(loggedinuserid, selectedprofileuserid))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SkillRating);
export default SkillRating;