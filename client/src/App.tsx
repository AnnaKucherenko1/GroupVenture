import React, { useContext, useEffect } from 'react';
import './App.css';
import Root from './root';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from "./UserContext";


function App() {

  // this is a temp user identifier solution
  // useEffect(() => {
  //   localStorage.setItem('userId', "1");
  // }, []);
  
  return (
    <UserProvider>
    <div className="App">
      <Router>
      <NavBar/>
      <Root/> 

      </Router>
    </div>
    </UserProvider>
  );
}

export default App;
