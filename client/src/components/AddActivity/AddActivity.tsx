import { useNavigate } from "react-router-dom";
import "./AddActivity.css"
export default function AddActivity () {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/addactivity");
      };
return <button className="button" onClick={()=>handleClick()}>Add an activity</button>
}