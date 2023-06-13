import React, {
  ChangeEvent,
  FormEvent,
  createRef,
  useState,
  RefObject,
} from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { postUser } from "../../Services/serviceUser";
import "./Authentication.css";

export interface FormDataInterface {
  avatar: string | File | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  infoAboutUser: string;
}

interface AvatarUploadProps {
  image: string;
  imageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupPage() {
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
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.age === "" ||
      formData.infoAboutUser === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

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

      await postUser(user);

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

      navigate("/profile/${id}");
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      alert("An error occurred while uploading the image. Please try again.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm='6'>
          <div className='signUp'>
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
              <h3
                className='fw-normal mb-3 ps-5 pb-3'
                style={{ letterSpacing: "1px" }}
              >
                Sign Up Now
              </h3>
              <form onSubmit={handleSubmit}>
                <div className='mb-4 mx-5 w-100'>
                  <label style={{ letterSpacing: "1px" }}>
                    Choose your profile picture
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
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  label='Email address'
                  id='email'
                  type='email'
                  size='lg'
                  value={formData.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  label='Password'
                  id='password'
                  type='password'
                  size='lg'
                  value={formData.password}
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
                  Sign Up
                </MDBBtn>
              </form>
            </div>
          </div>
        </MDBCol>
        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img
            src='signUp.jpeg'
            alt='Sign up image'
            className='w-100'
            style={{
              objectFit: "cover",
              objectPosition: "left",
              width: "100%",
              height: "100%",
              maxHeight: "auto",
            }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
