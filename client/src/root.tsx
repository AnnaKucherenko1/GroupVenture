import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import Profile from "./pages/Profile/Profile";
import SignupPage from "./pages/Authentication/SignupPage";
import AddActivityPage from "./pages/AddActivityPage/AddActivityPage";
import Logout from "./pages/Authentication/Logout";

const Root = ({ setIsLoggedIn }: any) => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/login'
        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path='/logout'
        // @ts-ignore
        element={<Logout setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/addactivity' element={<AddActivityPage />} />
    </Routes>
  );
};

export default Root;
