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
    <div className="homePage">
      {uid ? (
        <MDBBtn className="btnmy" color='info' size='lg' onClick={handleClick}>
          Add an activity
        </MDBBtn>
      ) : (
        <p
          className='testBlock'
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          To access detailed information about activities, please log in to your
          account. <Link to='/login'><span className="span">Log in</span></Link> or{" "}
          <Link to='/signup'><span className="span">Sign up</span></Link> to get started.
        </p>
      )}
    </div>
  );
}
