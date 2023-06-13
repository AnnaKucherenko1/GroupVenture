import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBCardText,
} from "mdb-react-ui-kit";
import "./Profile.css";
import { FormDataInterface } from "../Authentication/SignupPage";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUID } from "../../customHooks";
import { getUserById, updateUser } from "../../Services/serviceUser";

const EditProfile = ({ handleClose, profileUser }: any) => {
  const { id } = useParams();
  const uid = useUID();
  const [image, _setImage] = useState(profileUser?.avatar);
  const navigate = useNavigate();

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
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          _setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        _setImage(undefined);
      }
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
      console.log(data, "data are here");
      const imageUrl = data.url;

      const user = {
        avatar: imageUrl || profileUser.avatar,
        firstName: formData.firstName || profileUser.firstName,
        lastName: formData.lastName || profileUser.lastName,
        email: formData.email || profileUser.email,
        password: formData.password || profileUser.password,
        age: formData.age || profileUser.age,
        infoAboutUser: formData.infoAboutUser || profileUser.infoAboutUser,
      };

      const userUpdated = await updateUser(uid, user);
      console.log("The user shoudl be updated here ==> ", userUpdated);

      const fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      handleClose();

      //   navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("An error occurred while uploading the image. Please try again.");
    }
  };

  return (
    <div className='editProfileContainer'>
      <MDBCard className='w-20'>
        <MDBCardBody>
          <div>Here you can edit your profile info</div>
          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <form onSubmit={handleSubmit}>
              <div className='mb-2 mx-5 w-100'>
                <div className=' d-flex justify-content-center'>
                  <div className='profileAvatar'>
                    {formData.avatar || profileUser?.avatar ? (
                      <img src={image} />
                    ) : (
                      <div className='altTextContainer'>
                        <div>Choose your profile picture</div>
                      </div>
                    )}
                  </div>
                </div>
                <MDBInput
                  id='avatar'
                  type='file'
                  size='lg'
                  accept='image/*'
                  onChange={handleChange}
                />
              </div>
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                label='First name'
                id='firstName'
                type='text'
                size='lg'
                value={formData.firstName || profileUser?.firstName || ""}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                label='Last Name'
                id='lastName'
                type='text'
                size='lg'
                value={formData.lastName || profileUser?.lastName || ""}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                label='Age'
                id='age'
                type='number'
                size='lg'
                min='0'
                value={formData.age || profileUser?.age || ""}
                onChange={handleChange}
              />
              <MDBTextArea
                wrapperClass='mb-2 mx-5 w-100'
                label='Info about you'
                id='infoAboutUser'
                size='lg'
                value={
                  formData.infoAboutUser || profileUser?.infoAboutUser || ""
                }
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                label='Email address'
                id='email'
                type='email'
                size='lg'
                value={formData.email || profileUser?.email || ""}
                onChange={handleChange}
              />
              <MDBInput
                wrapperClass='mb-2 mx-5 w-100'
                label='Password'
                id='password'
                type='password'
                size='lg'
                value={formData.password || profileUser?.password || ""}
                onChange={handleChange}
              />
              <MDBBtn
                className='mb-2 px-5 mx-5 w-100'
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

export default EditProfile;
