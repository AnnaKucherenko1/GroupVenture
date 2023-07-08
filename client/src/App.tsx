import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Root from "./root";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Root setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </div>
  );
}

export default App;
