import { Link, useNavigate } from "react-router-dom";
import "./AddActivity.css"
import { useContext } from "react";
import { useUID } from "../../customHooks";

export default function AddActivity () {
  const uid = useUID();
  const navigate = useNavigate();
  const handleClick = () => {
    if (uid) {
      navigate("/addactivity");
    }
  };

  return (    
    <div>
      {uid ? (
        <button className="button" onClick={handleClick}>
          Add an activity
        </button>
      ) : (
        <p className="testBlock">
          You need to be logged in to be able to create activities.{" "}
          <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link>{" "}
          to get started.
        </p>
      )}
    </div>
  )
}