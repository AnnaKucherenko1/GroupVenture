import { Link, useNavigate } from "react-router-dom";
import "./AddActivity.css"
import { useContext } from "react";
import { UserContext } from "../../UserContext";
export default function AddActivity () {
  const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick = () => {
      if (user) {
        navigate("/addactivity");
      }
      };
return (    <div>
  {user ? (
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
</div>)
}