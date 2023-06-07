import "./NavBar.css"
import React from "react";
import { Link } from "react-router-dom";
export default function NavBar () {
return (
<div className="navbar">
    <nav id="nav">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </nav>
        </div>
)
}