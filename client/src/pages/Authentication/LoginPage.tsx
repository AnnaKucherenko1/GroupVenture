import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/serviceUser";
import { useCookies } from "../../customHooks";
import "./Authentication.css";

export default function LoginPage({ setIsLoggedIn }: any) {
  const sessionCookie = useCookies("sid");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      const uid = response.data;
      localStorage.setItem("uid", uid);
      setIsLoggedIn(true);
      navigate(`/profile/${uid}`);
    } catch (error) {
      setPasswordCorrect(false);
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleRegisterClick = () => {
    navigate("/signup");
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="login">
            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3
                className="fw-normal mb-3 ps-5 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Log in
              </h3>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={formData.email}
                  onChange={handleChange}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={formData.password}
                  onChange={handleChange}
                />
                {!passwordCorrect && (
                  <div style={{ color: "red" }}>Incorrect email or password.</div>
                )}
                <MDBBtn className="mb-4 px-5 mx-5 w-100" color="info" size="lg">
                  Login
                </MDBBtn>
              </form>
              <p className="small mb-5 pb-lg-3 ms-5">
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
              <p className="text ms-5">
                Don't have an account?{" "}
                <a
                  href="#!"
                  className="link-info"
                  onClick={handleRegisterClick}
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="login.jpeg"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
