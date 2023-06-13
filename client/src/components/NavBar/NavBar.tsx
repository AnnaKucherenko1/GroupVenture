import "./NavBar.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUID } from "../../customHooks";

export default function NavBar() {
  const uid = useUID();
  console.log("NavBar", uid);
  const [showLogin, setShowLogin] = useState<boolean>(uid ? false : true);

  useEffect(() => {
    console.log("uid has changed");
    if (uid) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  }, [uid]);

  return (
    <div className='navbar'>
      <nav id='nav'>
        <div
          className='app-name'
          style={{
            fontFamily: "Orbit",
            fontStyle: "sans-serif",
            fontWeight: "cursive",
          }}
        >
          GroupVenture
          <span className='material-symbols-outlined'>diversity_3</span>
        </div>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {showLogin ? (
          <li>
            <Link to='/login'>Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to={`/profile/${uid}`}>Profile</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}
