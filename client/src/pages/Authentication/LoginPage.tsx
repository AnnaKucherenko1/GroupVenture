import React, {
  useState,
  ChangeEvent,
  FormEvent,
  createContext,
  useContext,
} from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/serviceUser";
import { useCookies } from "../../customHooks";

export default function LoginPage({ setIsLoggedIn }: any) {
  const sessionCookie = useCookies("sid");
  const navigate = useNavigate();
  // const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      alert("Incorrect email or password");
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
        <MDBCol sm='6'>
          <div className='d-flex flex-row ps-5 pt-5'>
            {/* <MDBIcon fas icon="/logo.png" style={{ color: '#709085' }}/> */}
            {/* <MDBCol sm='2' className='d-none d-sm-block px-0'>
              <img src="logo2.png"
                alt="Logo image" className="w-100" />
            </MDBCol> */}
            <span className='h1 fw-bold mb-0'>GroupVenture</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
            <h3
              className='fw-normal mb-3 ps-5 pb-3'
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>
            <form onSubmit={handleSubmit}>
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

              <MDBBtn className='mb-4 px-5 mx-5 w-100' color='info' size='lg'>
                Login
              </MDBBtn>
            </form>
            <p className='small mb-5 pb-lg-3 ms-5'>
              <a className='text-muted' href='#!'>
                Forgot password?
              </a>
            </p>
            <p className='ms-5'>
              Don't have an account?{" "}
              <a href='#!' className='link-info' onClick={handleRegisterClick}>
                Register here
              </a>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img
            src='login.jpeg'
            alt='Login image'
            className='w-100'
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
