import React, {useState, useEffect} from 'react'
import { Header } from "./index";
import ResultSurface from "./ResultSurface";
import ProfileSurface from "./ProfileSurface";

function MainSurface(props) {
  const [profileUserid, setProfileUserid] = useState();

  useEffect(() => {
    setProfileUserid(profileUserid);
    console.log('profileuserid in main surface: ', profileUserid);
  }, [profileUserid]);
      
    return (
      <div>
        <Header />
        {/* {!profileUserid && <ResultSurface profileid={getUseridForProfile} />} */}
        {!profileUserid && <ResultSurface profileid={(userid) => {setProfileUserid(userid)}} />}
        {/* { <ProfileSurface profileid={18} />} */}
        {profileUserid && <ProfileSurface profileid={profileUserid} />}
      </div>
    );
}

export default MainSurface
