import React, { useState, useEffect } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { getAllUser } from "../../api/UserRequest";
import { useSelector } from "react-redux";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUser();
      setPersons(data.data);
      console.log("All User: ", data.data);
    };

    fetchPerson();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person) => {
        if (person._id === user._id) {
          return null;
        }
        return <User person={person} key={person._id} />;
      })}
    </div>
  );
};

export default FollowersCard;
