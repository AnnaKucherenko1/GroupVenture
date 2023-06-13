import React, { ChangeEvent, FormEvent, useContext } from "react";
import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../Services/serviceUser";
import { useState, useEffect } from "react";
import AddActivity from "../../components/AddActivity/AddActivity";
import CreatedActivities from "../../components/CreatedActivities/CreatedActivities";
import { useUID } from "../../customHooks";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { FormDataInterface } from "../Authentication/SignupPage";
export default function Profile() {
  const navigate = useNavigate();
  const [image, _setImage] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<FormDataInterface>({
    avatar: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    infoAboutUser: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === "avatar" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      setFormData({
        ...formData,
        avatar: file || null,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dspd8serh/upload";
    const cloudinaryUploadPreset = "GroupVenture";

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", formData.avatar || "");
    formDataToUpload.append("upload_preset", cloudinaryUploadPreset);

    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formDataToUpload,
      });

      const data = await response.json();
      const imageUrl = data.url;

      const user = {
        avatar: imageUrl,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        infoAboutUser: formData.infoAboutUser,
      };

      // await postUser(user);

      setFormData({
        avatar: null,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        age: "",
        infoAboutUser: "",
      });

      const fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("An error occurred while uploading the image. Please try again.");
    }
  };

  const { id } = useParams();
  const uid = useUID();
  const [profileUser, setProfileUser] = useState<any | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isEditing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    getUserById(id)
      .then((user: any) => {
        if (user) {
          setProfileUser(user);
        }
        console.log(user);
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

  const EditProfile = () => {
    return (
      <div className='editProfileContainer'>
        <MDBCard className='w-20'>
          <MDBCardBody>
            <MDBCardTitle>Here you can edit your profile info</MDBCardTitle>
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
              <form onSubmit={handleSubmit}>
                <div className='mb-4 mx-5 w-100'>
                  <label style={{ letterSpacing: "1px" }}>
                    Change your profile picture
                  </label>
                  <MDBInput
                    wrapperClass='mb-0'
                    id='avatar'
                    type='file'
                    size='lg'
                    accept='image/*'
                    onChange={handleChange}
                  />
                </div>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  label='First name'
                  id='firstName'
                  type='text'
                  size='lg'
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  label='Last Name'
                  id='lastName'
                  type='text'
                  size='lg'
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  label='Age'
                  id='age'
                  type='number'
                  size='lg'
                  value={formData.age}
                  onChange={handleChange}
                />
                <MDBTextArea
                  wrapperClass='mb-4 mx-5 w-100'
                  label='Info about you'
                  id='infoAboutUser'
                  size='lg'
                  value={formData.infoAboutUser}
                  onChange={handleChange}
                />
                <MDBBtn
                  className='mb-4 px-5 mx-5 w-100'
                  color='info'
                  size='lg'
                  type='submit'
                >
                  Submit Changes
                </MDBBtn>
              </form>
            </div>
            <MDBBtn color='danger' onClick={handleClose}>
              Close
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
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
        <MDBBtn className='mx-2' color='secondary' onClick={handleEditClick}>
          {" "}
          Edit Profile
        </MDBBtn>
        <AddActivity />
      </>
    );
  };

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
        <div className='infoAboutUser'>{profileUser?.infoAboutUser || ""}</div>
        <CreatedActivities uid={uid} />
        <div className='btns'>{RenderEditables()}</div>
        {isEditing && <EditProfile />}
      </div>
    </div>
  );
}
