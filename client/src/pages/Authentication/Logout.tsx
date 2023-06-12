import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Services/serviceUser";

export default function Logout({ setIsLoggedIn }: any) {
  let navigate = useNavigate();
  const handleClick = async () => {
    await logout();
    localStorage.removeItem("uid");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <Link to='/'>
        <button className='confirm-btn'>No</button>
      </Link>
      <button className='confirm-btn' onClick={() => handleClick()}>
        Yes
      </button>
    </div>
  );
}
