import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./CardsForActivity.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteActivityByID,
  getActivities,
  getActivityById,
} from "../../Services/serviceActivity";
import {
  updateUserActivity,
  updateUserActivityLeave,
} from "../../Services/serviceParticipants";
import { getUserById, getUsersByIds } from "../../Services/serviceUser";
import { useUID } from "../../customHooks";
export interface Coordinates {
  lat: number | null;
  lng: number | null;
  id?: string;
}

interface CardsForActivityProps {
  marker: Coordinates;
  id?: string;
  onClose?: Dispatch<SetStateAction<Coordinates | null>>;
}
interface User {
  avatar: string;
  firstName: string;
  lastName: string;
  age: string;
  infoAboutUser: string;
  id: string;
}
interface Activity {
  title: string;
  date: string;
  meetingPoint: string;
  createdBy: string;
  coordinates: Coordinates;
  typeOfActivity: string;
  aboutActivity: string;
  spots: string;
  telegramLink: string;
  UserActivityParticipations: string[];
}

const CardsForActivity: React.FC<CardsForActivityProps> = ({
  marker,
  onClose,
}) => {
  const uid = useUID();
  const [isOpen, setIsOpen] = useState(true);
  const [occupiedSpots, setOccupiedSpots] = useState(0);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [activity, setActivity] = useState({
    title: "",
    date: "",
    meetingPoint: "",
    createdBy: "",
    coordinates: {
      lat: null,
      lng: null,
    },
    typeOfActivity: "",
    aboutActivity: "",
    spots: "",
    telegramLink: "",
    UserActivityParticipations: [],
    id: "",
  });

  const [creator, setCreator] = useState({
    avatar: "",
    firstName: "",
    lastName: "",
    age: "",
    infoAboutUser: "",
    id: "",
  });
  useEffect(() => {
    getActivityById(marker.id)
      .then((activity: any) => {
        if (activity) {
          console.log(activity);
          setActivity(activity);
          console.log(activity);
          const userIds = [activity.createdBy];
          if (activity.UserActivityParticipations.length > 0) {
            const userParticipationIds =
              activity.UserActivityParticipations.map(
                (participation: any) => participation
              );
            console.log(userParticipationIds);
            userIds.push(...userParticipationIds);
            getUsersByIds(userIds)
              .then((users: any) => {
                const creator = users.find(
                  (user: any) => user.id === activity.createdBy
                );
                setCreator(creator);
                const participants = users.filter((user: any) =>
                  userParticipationIds.includes(user.id)
                );
                setParticipants(participants);
                console.log(participants, "par");
                setOccupiedSpots(participants.length);
                setIsUserParticipant(
                  participants.some((part: { id: number }) => part.id === uid)
                );
              })
              .catch((error: any) => {
                console.error(error);
              });
          } else {
            getUserById(activity.createdBy)
              .then((user: any) => {
                if (user) {
                  setCreator(user);
                }
              })
              .catch((error: any) => {
                console.error(error);
              });
          }
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, [occupiedSpots]);

  if (!marker || !isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(null);
    }
  };

  const joinActivity = () => {
    const participantsData = {
      userId: String(uid || ""),
      activityId: parseInt(marker.id || ""),
    };
    alert(
      `You just joined an activity created by: ${creator.firstName}, for for further communication use this link ${activity.telegramLink} `
    );
    updateUserActivity(participantsData)
      .then((response) => {
        setOccupiedSpots((prevSpots) => prevSpots + 1);
        getUsersByIds([
          activity.createdBy,
          ...activity.UserActivityParticipations,
        ]).then((users: any) => {
          const userParticipationIds = activity.UserActivityParticipations.map(
            (participation: any) => participation.userId
          );
          const updatedParticipants = users.filter((user: any) =>
            userParticipationIds.includes(user.id)
          );
          setParticipants(updatedParticipants);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const leaveActivity = () => {
    const participantsData = {
      userId: String(uid || ""),
      activityId: parseInt(marker.id || ""),
    };

    updateUserActivityLeave(participantsData)
      .then((response) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter(
            (participant) => parseInt(participant.id) !== uid
          )
        );
        setIsUserParticipant(false);
        setOccupiedSpots((prevSpots) => prevSpots - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const deleteActivity = () => {
    deleteActivityByID(activity.id).then(() => {
      // setMarkers((allActivities: any) => {
      //   return allActivities.filter((act: any) => act.id !== activity.id);
      // });
      handleClose();
    });
  };
  return (
    // <div className="card">
    <MDBCard>
      <MDBCardBody>
        <div className='button-section'>
          <MDBBtn className='delete-button' onClick={handleClose}>
            ✕
          </MDBBtn>
        </div>
        <div className='activity-details'>
          <MDBCardTitle>{activity.title}</MDBCardTitle>
          <MDBCardSubTitle>{activity.date}</MDBCardSubTitle>
          <MDBCardText>
            Info about activity: {activity.aboutActivity}
          </MDBCardText>
          <MDBCardText>
            Occupied spots: {occupiedSpots}/{activity.spots}
          </MDBCardText>
          <MDBCardTitle>Address: {activity.meetingPoint}</MDBCardTitle>
        </div>
        <div className='created-by'>
          <Link to={`/profile/${creator.id}`}>
            Created by: <span>{creator.firstName}</span>
          </Link>
        </div>
        <div>
          already joined:
          {participants.map((part, index) => (
            <React.Fragment key={part.id}>
              <Link to={`/profile/${part.id}`}>
                <span>{part.firstName}</span>
              </Link>
              {index !== participants.length - 1 && ", "}
            </React.Fragment>
          ))}
        </div>
        <div className='button-section'>
          {uid !== parseInt(creator.id) &&
            (isUserParticipant ? (
              <MDBBtn color='danger' onClick={leaveActivity}>
                Leave
              </MDBBtn>
            ) : (
              <MDBBtn color='success' onClick={joinActivity}>
                Join
              </MDBBtn>
            ))}
          {uid === parseInt(creator.id) && (
            <MDBBtn color='danger' onClick={deleteActivity}>
              Delete
            </MDBBtn>
          )}
        </div>
      </MDBCardBody>
    </MDBCard>
    // </div>
  );
};

export default CardsForActivity;
