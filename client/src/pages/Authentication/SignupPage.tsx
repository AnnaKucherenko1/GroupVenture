import React, { ChangeEvent, FormEvent, useState } from "react";
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

export default function SignupPage() {
  const navigate = useNavigate();
  const [passportValidate, setPassportValidate] = useState(true);
  const [userExist, setUserExist] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
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
    const hasUppercase = /[A-Z]/.test(formData.password);
    if (formData.password.length < 8 || hasUppercase === false) {
      setPassportValidate(false);
    } else {
      setPassportValidate(true)}

    const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL as string;
    const cloudinaryUploadPreset = process.env
      .REACT_APP_CLOUDINARY_NAME as string;
    if (formData.avatar) {
      try {
        const formDataToUpload = new FormData();
        formDataToUpload.append("file", formData.avatar || "");
        formDataToUpload.append("upload_preset", cloudinaryUploadPreset);
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formDataToUpload,
        });

        const data = await response.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while uploading the image. Please try again.");
      }
    }

    const user = {
      avatar: imageUrl,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      infoAboutUser: formData.infoAboutUser,
    };
    try {
      if(!(formData.password.length < 8 || hasUppercase === false)) {

        const res = await postUser(user);
        console.log(res)
        if (res.error) {
          setUserExist(true);
        } else {
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
      
            navigate("/login");
          
        }
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="signUp">
            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3
                className="fw-normal mb-3 ps-5 "
                style={{ letterSpacing: "3px", marginLeft: "30px" }}
              >
                <span>Sign Up Now</span>
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 mx-5 w-100">
                  <div className=" d-flex justify-content-center">
                    <div className="profileAvatar">
                      <img src={image} />
                      {!image && (
                        <div className="altTextContainer">
                          <div> Choose your profile picture</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <MDBInput
                    wrapperClass="mb-0"
                    id="avatar"
                    type="file"
                    size="lg"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="*First name"
                  id="firstName"
                  type="text"
                  size="lg"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="*Last Name"
                  id="lastName"
                  type="text"
                  size="lg"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="*Age"
                  id="age"
                  type="number"
                  size="lg"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                {userExist && (
                  <p className="text-danger mb-4 mx-5 w-100">
                    User with this email already exist.
                  </p>
                )}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="*Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {!passportValidate && (
                  <p className="text-danger mb-4 mx-5 w-100">
                    Password must be at least 8 characters with 1 uppercase
                    letter.
                  </p>
                )}
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="*Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <MDBTextArea
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Info about you"
                  id="infoAboutUser"
                  size="lg"
                  value={formData.infoAboutUser}
                  onChange={handleChange}
                />
                <MDBBtn
                  className="mb-4 px-5 mx-5 w-100"
                  color="info"
                  size="lg"
                  type="submit"
                >
                  Sign Up
                </MDBBtn>
              </form>
            </div>
          </div>
        </MDBCol>
        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="signUp.jpeg"
            alt="Sign up image"
            className="w-100"
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
