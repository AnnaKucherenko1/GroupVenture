import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import "./Profile.css";
import { FormDataInterface } from "../Authentication/SignupPage";
import { useState, ChangeEvent, FormEvent } from "react";
import { useUID } from "../../customHooks";
import { updateUser } from "../../Services/serviceUser";

const EditProfile = ({ handleClose, profileUser, handleProfileEdit }: any) => {
  const uid = useUID();
  const [image, _setImage] = useState(profileUser?.avatar);
  const [imageUrl, setImageUrl] = useState(profileUser?.avatar);

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
          setImageUrl(reader.result as string)
        };
        reader.readAsDataURL(file);
      } else {
        _setImage(undefined);
      }
    } else if (e.target.id === "password" && e.target.value !== '') {
      const newPassword = e.target.value;
      setFormData({
        ...formData,
        password: newPassword,
      })
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL as string;
    const cloudinaryUploadPreset = process.env
      .REACT_APP_CLOUDINARY_NAME as string;
   

    const formDataToUpload = new FormData();
    formDataToUpload.append("file", formData.avatar || "");
    formDataToUpload.append("upload_preset", cloudinaryUploadPreset);
    try {
      if(formData.avatar) {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formDataToUpload,
      });

      const data = await response.json();

      setImageUrl(data.url);
    }

      const user = {
        avatar: imageUrl || profileUser.avatar,
        firstName: formData.firstName || profileUser.firstName,
        lastName: formData.lastName || profileUser.lastName,
        email: formData.email || profileUser.email,
         password: formData.password,
        age: formData.age || profileUser.age,
        infoAboutUser: formData.infoAboutUser || profileUser.infoAboutUser,
      };

      const userUpdated = await updateUser(uid, user);

      const fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }

      handleClose();
      handleProfileEdit();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the image. Please try again.");
    }
  };

  return (
    <div className='editProfileContainer'>
      <div className='chnageBody'>
        <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-2'>
          <form onSubmit={handleSubmit}>
            <div className='mb-2 mx-5 w-100'>
              <div>Here you can edit your profile info</div>
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
              defaultValue={formData.firstName || profileUser?.firstName || ""}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-2 mx-5 w-100'
              label='Last Name'
              id='lastName'
              type='text'
              size='lg'
              defaultValue={formData.lastName || profileUser?.lastName || ""}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-2 mx-5 w-100'
              label='Age'
              id='age'
              type='number'
              size='lg'
              min='0'
              defaultValue={formData.age || profileUser?.age || ""}
              onChange={handleChange}
            />
            <MDBTextArea
              wrapperClass='mb-2 mx-5 w-100'
              label='Info about you'
              id='infoAboutUser'
              size='lg'
              defaultValue={
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
              defaultValue={formData.email || profileUser?.email || ""}
              onChange={handleChange}
            />
            <MDBInput
              wrapperClass='mb-2 mx-5 w-100'
              label='Password'
              id='password'
              type='password'
              size='lg'
              onChange={handleChange}
            />
            <MDBBtn
              className='mb-2 px-4 mx-5 w-100'
              color='info'
              size='lg'
              type='submit'
            >
              Submit Changes
            </MDBBtn>
            <MDBBtn
              className='mb-2 px-4 mx-5 w-100'
              color='danger'
              size='lg'
              onClick={handleClose}
            >
              Close
            </MDBBtn>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
