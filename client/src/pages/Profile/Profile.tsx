import React from "react";
import "./Profile.css"
import { useParams } from "react-router-dom";
import { getUserById } from "../../Services/serviceUser";
import { useState, useEffect } from "react";
import AddActivity from "../../components/AddActivity/AddActivity";



export default function Profile () {
    const { id } = useParams();
    const [user, setUser] = useState({ avatar: '',
        firstName: '',
        lastName: '',
        age: '', 
        infoAboutUser: '' });
        useEffect(() => {
        getUserById(id)
          .then((user: any) => {
     
            if (user) {
                setUser(user);
            }
          })
          .catch((error: any) => {
            console.error(error);
          });
      }, []);
    return (
        
    <div className="mainDivForProfile">
        <div className="profileBody">
        {user.firstName || ""}
        {user.age || ""}
        <div className="profileAvatar">{user.avatar && <img src={user.avatar} alt="Avatar" />}</div>
        {user.infoAboutUser || ""}
        <AddActivity/>
        </div>
        </div>
    )
}