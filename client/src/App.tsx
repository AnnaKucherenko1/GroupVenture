import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Root from "./root";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  // this is a temp user identifier solution
  // useEffect(() => {
  //   localStorage.setItem('userId', "1");
  // }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <Router>
        <NavBar />
        {/* @ts-ignore */}
        <Root setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </div>
  );
}

export default App;
