import React, {useState} from 'react'
import { Header } from "./index";
import ResultSurface from "./ResultSurface";
import ProfileSurface from "./ProfileSurface";

function MainSurface(props) {
  const [profileUserid, setProfileUserid] = useState();
  
  const getUseridForProfile = (userid) => {
    console.log('In mainsurface userid: ', userid);
    setProfileUserid((userid) => {console.log('inside setstate: ',userid,profileUserid)});
    console.log('profileuserid in main surface: ', profileUserid);
    };
      
    return (
      <div>
        <Header />
        {!profileUserid && <ResultSurface profileid={getUseridForProfile} />}
        {/* { <ProfileSurface profileid={17} />} */}
        {profileUserid && <ProfileSurface profileid={profileUserid} />}
      </div>
    );
}

export default MainSurface
