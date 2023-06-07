import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Signup from './components/Login/Signup';

const Root = () => {
  return (
    
      <Routes>
        <Route 
            path='/' 
            element={<Home />}
        />
        <Route 
            path='/login' 
            element={<LoginPage />}
        />
        <Route 
            path='/signup' 
            element={<Signup />}
        />
         <Route 
            path='/profile' 
            element={<Profile />}
        />
      </Routes>

  );
}

export default Root;
