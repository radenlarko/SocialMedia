import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    if (following) {
      setFollowing((prev) => !prev);
      return dispatch(unFollowUser(person._id, user));
    }

    setFollowing((prev) => !prev);
    return dispatch(followUser(person._id, user));
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button className={`button fc-button ${following ? "unfollow-button" : ""}`} onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
