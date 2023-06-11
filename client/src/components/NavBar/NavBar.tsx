import "./NavBar.css"
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function NavBar () {
  const { user } = useContext(UserContext);

  return (
    <div className="navbar">
      <nav id="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li>
            <Link to={`/profile/${user}`}>Profile</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </nav>
    </div>
  );
}