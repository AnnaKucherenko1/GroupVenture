import React, { useContext } from "react";
import "./Profile.css"
import { useParams } from "react-router-dom";
import { getUserById } from "../../Services/serviceUser";
import { useState, useEffect } from "react";
import AddActivity from "../../components/AddActivity/AddActivity";
import { UserContext } from "../../UserContext";

export default function Profile () {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [profileUser, setProfileUser] = useState<any | null>(null);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    useEffect(() => {
      getUserById(id)
        .then((user: any) => {
          if (user) {
            setProfileUser(user);
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
      if (user && profileUser && user === profileUser.id && !isEditable) {
        setIsEditable(true);
      }
    }, [user, profileUser])

    const renderEditables = () => {
      if (!isEditable) {
        return;
      }
      return (
        <>
        <input type="text" className="editable">

        </input>
        <AddActivity/>
        </>
      )
    }


    return (
      <div className="mainDivForProfile">
        <div className="profileBody">
          {profileUser?.firstName || ""}
          {profileUser?.age || ""}
          <div className="profileAvatar">{profileUser?.avatar && <img src={profileUser?.avatar} alt="Avatar" />}</div>
          {profileUser?.infoAboutUser || ""}
        {renderEditables()}
        </div>

      </div>
    )
}