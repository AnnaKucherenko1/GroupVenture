import React, { ChangeEvent, FormEvent, useContext } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { getUserById } from "../../Services/serviceUser";
import { useState, useEffect } from "react";
import AddActivity from "../../components/AddActivity/AddActivity";
import CreatedActivities from "../../components/CreatedActivities/CreatedActivities";
import EditProfile from "./EditProfile";
import { useUID } from "../../customHooks";
import { MDBBtn } from "mdb-react-ui-kit";

export default function Profile() {
  const { id } = useParams();
  const uid = useUID();
  const [profileUser, setProfileUser] = useState<any | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [profileEdited, setProfileEdited] = useState<boolean>(false);

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
    if (uid && profileUser && uid === profileUser.id && !isEditable) {
      setIsEditable(true);
    }
  }, [uid, profileUser]);

  const handleClose = () => {
    setEditing(false);
  };
  const RenderEditables = () => {
    if (!isEditable) {
      return null;
    }

    const handleEditClick = () => {
      setEditing((state) => !state);
    };
    return (
      <>
        <MDBBtn className='mx-2 narrower-width' color='danger' active onClick={handleEditClick}>
          Edit Profile
        </MDBBtn>
        <div className="addact">
        <AddActivity />
        </div>
      </>
    );
  };

  const handleProfileEdit = () => {
    setProfileEdited(true);
  };
  useEffect(() => {
    if (profileEdited) {
      getUserById(id)
        .then((user: any) => {
          if (user) {
            setProfileUser(user);
            setProfileEdited(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }, [profileEdited, id]);
  return (
    <div
      className='mainDivForProfile'
      style={{
        backgroundImage: "url(/pexels.jpeg)",
      }}
    >
      <div className='profileBody'>
        <div className='profileName'>
          <strong>
            {profileUser?.firstName || ""} {profileUser?.lastName || ""}
          </strong>
        </div>
        {profileUser?.age ? `Age: ${profileUser.age}` : ""}
        <div className='profileAvatar'>
          {profileUser?.avatar && (
            <img src={profileUser?.avatar} alt='Avatar' />
          )}
        </div>

        {!!profileUser?.infoAboutUser && (
          <div className='infoAboutUser'>{profileUser?.infoAboutUser || ""}</div>

        )
        
        }

        <CreatedActivities />
        <div className='btns'>{RenderEditables()}</div>
        {isEditing && (
          <EditProfile
            handleClose={handleClose}
            profileUser={profileUser}
            handleProfileEdit={handleProfileEdit}
          />
        )}
      </div>
    </div>
  );
}
