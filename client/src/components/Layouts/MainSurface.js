import React, {useState, useEffect} from 'react'
import { Header } from "./index";
import ResultSurface from "./ResultSurface";
import ProfileSurface from "./ProfileSurface";

function MainSurface() {
  const [profileUserid, setProfileUserid] = useState();

  useEffect(() => {
    setProfileUserid(profileUserid);
    console.log('profileuserid in main surface: ', profileUserid);
  }, [profileUserid]);
      
    return (
      <div>
        <Header resetProfileUseridCallback={() => {setProfileUserid()}}/>
        {!profileUserid && <ResultSurface profileid={(userid) => {setProfileUserid(userid)}} />}
        {profileUserid && <ProfileSurface profileid={profileUserid} />}
      </div>
    );
}

export default MainSurface
