import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import moment from "moment";
import "./CardsForActivity.css";
import {
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import {
  deleteActivityByID,
  getActivityById,
} from "../../Services/serviceActivity";
import {
  updateUserActivity,
  updateUserActivityLeave,
} from "../../Services/serviceParticipants";
import { getUserById, getUsersByIds } from "../../Services/serviceUser";
import { useUID } from "../../customHooks";
import EditActivity from "../EditActivity/EditActivity";
import {
  ActivityInterface,
  User,
  APIResponse,
  CardsForActivityProps,
} from "../../interfaces";
import { ACTIVITY_INIT_VALUE, CREATOR_INIT_VALUE } from "../../constants";


const CardsForActivity: React.FC<CardsForActivityProps> = ({
  marker,
  onClose,
}) => {
  const uid = useUID();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [occupiedSpots, setOccupiedSpots] = useState<number>(0);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isUserParticipant, setIsUserParticipant] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activity, setActivity] =
    useState<ActivityInterface>(ACTIVITY_INIT_VALUE);
  const [creator, setCreator] = useState<User>(CREATOR_INIT_VALUE);

  const fetchActivity = useCallback(
    async (id: string) => {
      const response = await getActivityById(id);
      const fetchedActivity = response.data;

      if (!response.success || !fetchedActivity) {
        alert("Failed to fetch activity details, please contact support");
      }

      return fetchedActivity;
    },
    []
  );

  const fetchUsers = useCallback(
    async (ids: string[]) => {
      const response = await getUsersByIds(ids);
      const mappedResults: User[] = response.map(
        (res: APIResponse<User>) => res.data
      );

      return mappedResults;
    },
    []
  );

  const userJoinActivity = useCallback(
    async (userId: string, activityId: number) => {
      const response = await updateUserActivity({userId, activityId});

      if (!response.success) {
        alert(`Failed to join activity, please try again.`);
        return;
      }

      const userInfo: APIResponse<User> = await getUserById(uid);

      if (userInfo.success) {
        setParticipants([...participants, userInfo.data]);
      }

      setIsUserParticipant(true);
      setOccupiedSpots((prevSpots) => prevSpots + 1);
      alert(
        `You just joined an activity created by: ${creator.firstName},s for further communication use this link ${activity.telegramLink} `
      );
    },
    [updateUserActivity, setParticipants, setOccupiedSpots, setIsUserParticipant, participants]
  );

  useEffect(() => {
    if (!marker.id) {
      return;
    }

    const initCardInfo = async (id: string) => {
      const fetchedActivity = await fetchActivity(id);

      const userIds = [fetchedActivity.createdBy];
      const userParticipationIds =
        fetchedActivity.UserActivityParticipations.map(
          (participation: string[]) => participation
        );
      userIds.push(...userParticipationIds);

      const eventUsers = await fetchUsers(userIds);

      const eventCreator = eventUsers.find(
        (result: User) => result.id === fetchedActivity.createdBy
      );

      if (!eventCreator)
        // This should never happen unless I mess up something on the BE
        alert("Event data corrupt, please contact support.");

      const otherParticipants = eventUsers.filter(
        (participant: User) => participant.id !== fetchedActivity.createdBy
      );

      setActivity(fetchedActivity);
      setParticipants(otherParticipants);
      setCreator(eventCreator as User);
      setOccupiedSpots(userParticipationIds.length);
      setIsUserParticipant(userParticipationIds.includes(uid));
    };

    initCardInfo(marker.id);
  }, [
    marker.id,
    fetchActivity,
    fetchUsers,
    setParticipants,
    setCreator,
    setOccupiedSpots,
    setIsUserParticipant,
  ]);

  if (!marker || !isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose(null);
    }
  };

  const joinActivity = async () => {
    if (!marker.id) {
      return;
    }

    await userJoinActivity(uid, parseInt(marker.id));
  };

  const leaveActivity = async () => {
    const participantsData = {
      userId: uid || "",
      activityId: parseInt(marker.id || ""),
    };

    const response = await updateUserActivityLeave(participantsData);

    if (!response.success) {
      alert(`Failed to join activity, please try again.`);
      return;
    }

    setParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== uid)
    );
    setIsUserParticipant(false);
    setOccupiedSpots((prevSpots) => prevSpots - 1);
  };

  const deleteActivity = () => {
    if (activity.id) {
      deleteActivityByID(activity.id).then(() => {
        handleClose();
      });
    }
  };

  const editActivity = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return <EditActivity handleClose={handleClose} activity={activity} />;
  }

  return (
    <div className="card">
      <div className="button-section">
        <MDBBtn className="delete-button" onClick={handleClose}>
          ✕
        </MDBBtn>
      </div>
      <div className="activity-details">
        <div className="activity-info">
          <MDBCardTitle>{activity.title}</MDBCardTitle>
          <MDBCardSubTitle>
            {moment(activity.date).format("llll")}
          </MDBCardSubTitle>
          <MDBCardText>
            <strong>Type of activity:</strong> {activity.typeOfActivity}
          </MDBCardText>
          <MDBCardText>
            <strong>Info about activity:</strong> {activity.aboutActivity}
          </MDBCardText>
          <MDBCardText>
            <strong>Address:</strong> {activity.meetingPoint}
          </MDBCardText>
          <MDBCardText>
            <strong>Occupied spots:</strong> {occupiedSpots}/{activity.spots}
          </MDBCardText>
        </div>
        <Link to={`/profile/${creator.id}`}>
          <div className="created-by">
            <div className="createdText">
              {" "}
              Created by: <span>{creator.firstName} </span>
            </div>
            <div className="avatar">
              {" "}
              <img src={creator?.avatar} alt="Avatar" />
            </div>
          </div>
        </Link>
      </div>
      <div className="participants">
        {participants.length ? (
          <div>
            <strong>Already joined:</strong>
            {participants.map((part, index) => (
              <React.Fragment key={part.id}>
                <Link to={`/profile/${part.id}`}>
                  <span>{part.firstName}</span>
                </Link>
                {index !== participants.length - 1 && ", "}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>No participants yet</div>
        )}
      </div>
      <div className="button-section">
        {uid !== creator.id && (
          <>
            {isUserParticipant ? (
              <MDBBtn color="danger" onClick={leaveActivity}>
                Leave
              </MDBBtn>
            ) : (
              <MDBBtn color="success" onClick={joinActivity}>
                Join
              </MDBBtn>
            )}
          </>
        )}
        {uid === creator.id && (
          <div className="btns">
            <MDBBtn
              className="me-2 width-btn"
              color="info"
              onClick={editActivity}
            >
              EDIT
            </MDBBtn>
            <MDBBtn
              className="me-1 width-btn"
              color="danger"
              onClick={deleteActivity}
            >
              Delete
            </MDBBtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsForActivity;
