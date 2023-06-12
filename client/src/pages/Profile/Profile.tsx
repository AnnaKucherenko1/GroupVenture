import React, { useContext } from "react";
import "./Profile.css"
import { useParams } from "react-router-dom";
import { getUserById } from "../../Services/serviceUser";
import { useState, useEffect } from "react";
import AddActivity from "../../components/AddActivity/AddActivity";
import { useUID } from "../../customHooks";


export default function Profile () {
    const { id } = useParams();
    const uid = useUID();
    const [profileUser, setProfileUser] = useState<any | null>(null);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    useEffect(() => {
      getUserById(id)
        .then((user: any) => {
          if (user) {
            setProfileUser(user);
          }
          console.log(user)
        })
        .catch((error: any) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
      if (uid && profileUser && uid === profileUser.id && !isEditable) {
        setIsEditable(true);
      }
    }, [uid, profileUser]);

    const renderEditables = () => {
      if (!isEditable) {
        return;
      }
      return (
        <>
        <button className="editable"> edit profile</button>
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