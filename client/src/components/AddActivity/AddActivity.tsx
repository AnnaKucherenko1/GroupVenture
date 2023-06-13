import { Link, useNavigate } from "react-router-dom";
import "./AddActivity.css";
import { useUID } from "../../customHooks";
import { MDBBtn } from "mdb-react-ui-kit";

export default function AddActivity() {
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
        <MDBBtn color='info' onClick={handleClick}>
          Add an activity
        </MDBBtn>
      ) : (
        // <button className='button' onClick={handleClick}>
        //   Add an activity
        // </button>
        <p
          className='testBlock'
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          You need to be logged in to be able to create activities.{" "}
          <Link to='/login'>Log in</Link> or <Link to='/signup'>Sign up</Link>{" "}
          to get started.
        </p>
      )}
    </div>
  );
}
