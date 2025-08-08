import './rightbar.css'
import {Users} from '../../dummyData'
import Online from '../online/Online'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from "@mui/icons-material"

export default function Rightbar({user}) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends] = useState([]);
  const {user:currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      if(user?.id){

        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
        console.log(err);
        }
      }
    };
    getFriends();
  }, [user]);

   const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };


  const HomeRightBar = () =>{
    return(
    <>
      <div className="birthdayContainer">
          <img className='birthdayImg' src={PUBLIC_FOLDER+"/gift.png"} alt="" />
          <span className="birthdayText">
            <b>John </b>and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={PUBLIC_FOLDER+"/ad.png"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u}/>
          ))}
        </ul>
    </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rigthbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
      <h4 className="rightbarTitle">Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City: </span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From: </span>
          <span className="rightbarInfoValue">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship: </span>
          <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" 
          : user.relationship === 2 ? "Married" : "Empty"}</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PUBLIC_FOLDER + friend.profilePicture
                      : PUBLIC_FOLDER + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
      </div>
      </>
    )
  }

  return (
    <>
    
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
    </>
  )
}
