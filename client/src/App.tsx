import React from 'react';
import './App.css';
import Root from './root';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
      <NavBar/>
      <Root/> 

      </Router>
    </div>
  );
}

export default App;
